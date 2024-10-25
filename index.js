$(document).ready(function() {
    // Check if user is logged in
    var userLoggedIn = false; // This should be determined from session or cookies

    // Handle purchase button click
    $('.purchase-btn').on('click', function() {
        if (!userLoggedIn) {
            window.location.href = 'login.html';
        } else {
            alert('Proceed to purchase');
        }
    });

    // Update navbar after login
    var userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        var username = userEmail.split('@')[0];
        $('#login-register').text(username);
    }
});