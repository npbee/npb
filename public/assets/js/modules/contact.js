define([], function() {

    var contact = {

        init: function() {
            this.handleSubmit();
        },

        handleSubmit: function() {
            var form = document.getElementById('contact-form'),
                  submit = document.getElementById('submit-button');

            if ( form ) {
                form.addEventListener('submit', function(event) {
                    event.preventDefault();

                    var name = document.contact.name.value,
                          nameErr = document.getElementById('name-error'),
                          nameGrp = document.getElementById('name-group'),
                          email = document.contact.email.value,
                          emailErr = document.getElementById('email-error'),
                          emailGrp = document.getElementById('email-group'),
                          descrip = document.contact.description.value,
                          descripErr = document.getElementById('description-error'),
                          descripGrp = document.getElementById('description-group'),
                          submitErr = document.getElementById('submit-error'),
                          submitGrp = document.getElementById('submit-group'),
                          fieldsets = document.querySelectorAll(' .contact-form fieldset ');


                    var dataString = 'name='+ name + '&email=' + email + '&description=' + descrip;

                    // Begin Ajax
                    var ajax = new XMLHttpRequest();

                    // Add loading class to button
                    submit.classList.add('sending');

                    // Remove previous error messages
                    [].forEach.call(fieldsets, function(el) {
                        el.classList.remove('has-error');
                    });


                    ajax.onreadystatechange = function() {
                        if ( ajax.readyState === 4 && ajax.status === 200 ) {
                            var response = JSON.parse(ajax.responseText);
                            console.log(response);
                            displayResult(response);
                        }
                    };

                    ajax.open('POST', '/assets/php/formSubmit.php?', true);
                    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    ajax.send(dataString);

                    //Update the page to display the result
                    function displayResult(response) {
                        if ( response.success ) {
                            submit.classList.remove('sending');
                            submit.classList.remove('error');
                            submit.classList.add('sent');
                            submit.innerHTML = response.message;
                        } else {

                            submit.classList.remove('sending');
                            submit.classList.add('error');
                            submit.innerHTML = response.message;

                            setTimeout(resetSubmitButton, 3000);

                            if ( response.errors.name ) {
                                nameGrp.classList.add('has-error');
                                nameErr.innerHTML = response.errors.name;
                            }

                            if ( response.errors.email ) {
                                emailGrp.classList.add('has-error');
                                emailErr.innerHTML = response.errors.email;
                            }

                            if ( response.errors.description ) {
                                descripGrp.classList.add('has-error');
                                descripErr.innerHTML = response.errors.description;
                            }

                            if ( response.errors.mail ) {
                                submitGrp.classList.add('has-error');
                                submitErr.innerHTML = response.errors.mail;
                            }

                        }
                    }

                    //Reset the submit button after errors
                    function resetSubmitButton() {
                        submit.innerHTML = 'Send!';
                        submit.classList.remove('error');
                    }
                });

            }

        }

    };

    return contact;

});