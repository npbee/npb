module.exports = function(datestring) {
    var date = new Date(datestring);
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
};
