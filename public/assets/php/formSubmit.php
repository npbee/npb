<?php

    //$fields = array('name', 'email', 'description');
    $name = $_POST['name'];
    $email = $_POST['email'];
    $description = $_POST['description'];
    $fields = array($name, $email, $description);
    $errors = array();
    $data = array();


    if ( empty($name) ) {
        $errors['name'] = 'Name is required please!';
    }

    if ( empty($email) ) {
        $errors['email'] = 'Email is required please';
    } else if ( !filter_var($email, FILTER_VALIDATE_EMAIL) ) {
        $errors['email'] = 'Please enter a valid email address';
    }

    if ( empty($description) ) {
        $errors['description'] = 'Please enter a description!';
    }



    // If there are errors, display them
    // Else send success message
    if ( !empty($errors) ) {

        $data['success'] = false;
        $data['errors'] = $errors;
        $data['message'] = 'Trouble!';

        // Send back the json data
        echo json_encode($data);

    } else {

        $data['success'] = true;
        $data['message'] = 'Sent!';

        echo json_encode($data);

        //sendmail($name, $email, $description, $data);
    }

    function sendmail($name, $email, $description, $data) {

        // Send back the json data, we don't need to wait for the mail to go


        //Sanitize strings
        //$san_name = filter_var($name, FILTER_SANITIZE_STRING);
        //$san_description = filter_var($description, FILTER_SANITIZE_STRING);

        $to = 'nicholaspball@gmail.com';
        $subject = 'New Kinmill Message!';
        $sanitized_name = filter_var($name, FILTER_SANITIZE_STRING);
        $sanitized_description = filter_var($description, FILTER_SANITIZE_STRING);

        $headers = "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "MIME-version: 1.0" . "\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1" . "\r\n";

        $message = '<html><body>';
        $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
        $message .= "<tr style='background: #eee;'><td><strong>Name:</strong> </td><td>" . $sanitized_name . "</td></tr>";
        $message .= "<tr><td><strong>Email:</strong> </td><td>" . $email . "</td></tr>";
        $message .= "<tr><td><strong>Message:</strong> </td><td>" . $sanitized_description . "</td></tr>";
        $message .= "</table>";
        $message .= "</body></html>";

        mail($to, $subject, $message, $headers);

    }

?>