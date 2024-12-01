$(document).ready(function() {

    checkLoginState();
        
    function checkLoginState() {
        const username = localStorage.getItem('uName');
        updateNavigation(username);
    }

    function updateNavigation(username) {
        if(username){
        const loginRegisterLi = $('.dropdown:last');
        loginRegisterLi.html(`
            <a href="#" class="user-profile">${username} ▼</a>
            <ul class="dropdown-content">
                <li><a href="profile.html">Profile</a></li>
                <li><a href="login.html" onclick="handleLogout(event)">Logout</a></li>
            </ul>
        `);
        }      
    }


function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('uName');
    localStorage.removeItem('userType');
    localStorage.removeItem('email');
    localStorage.removeItem('permissions');
    localStorage.removeItem('staffNumber');
    localStorage.removeItem('username');
    localStorage.removeItem('wishlist');
    window.location.href = 'index.html';
}

    const username = localStorage.getItem('uName');
    if (!username) {
        window.location.href = 'login.html';
    }
});

