$(document).ready(function () {
    checkLoginState();

    function checkLoginState() {
        const username = localStorage.getItem('uName');
        if (username) {
            $('#staff-name').text(username);
            updateNavigation(username);
        } else {
            window.location.href = 'login.html';
        }
    }

    function updateNavigation(username) {
        const loginRegisterLi = $('#login-register').closest('li');
        loginRegisterLi.html(`
            <a href="#" class="user-profile">${username} ▼</a>
            <ul class="dropdown-content">
                <li><a href="profile.html">Profile</a></li>
                <li><a href="#" onclick="handleLogout(event)">Logout</a></li>
            </ul>
        `);
    }

    function handleLogout(event) {
        event.preventDefault();
        localStorage.clear();
        window.location.href = 'index.html';
    }

    const notifications = [
        "You have 1 new pending requests.",
        "Reminder: Nothing",
        "New insurance policy updates are available."
    ];

    notifications.forEach((notification) => {
        $('#notification-list').append(`<li>${notification}</li>`);
    });
});
