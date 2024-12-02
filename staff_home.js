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
                <li><a href="login.html" onclick="handleLogout(event)">Logout</a></li>
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


    $("#chat-box").addClass("minimized");
    $("#minimize-chat").text("+");


    $("#minimize-chat").on("click", function () {
        $("#chat-box").toggleClass("minimized"); 

        if ($("#chat-box").hasClass("minimized")) {
            $(this).text("+");
        } else {
            $(this).text("-");
        }
    });


    $("#send-message").on("click", function () {
        const message = $("#message-input").val();
        if (message.trim() !== "") {
            addMessage(message, "user");
            $("#message-input").val("");

        }
    });


    function addMessage(message, sender) {
        const messageElement = $("<div>")
            .addClass("message")
            .addClass(sender)
            .text(message);

        $("#messages").append(messageElement);

        const messagesContainer = $("#messages");
        messagesContainer.scrollTop(messagesContainer[0].scrollHeight);
    }
});
