$(document).ready(function() {
    $('#login-form').on('submit', function(event) {
        event.preventDefault();

        // Simulate login by saving email to local storage
        var email = $('#email').val();
        localStorage.setItem('userEmail', email);

        // Redirect back to index page
        window.location.href = 'index.html';
    });
});