$(document).ready(function() {

    checkLoginState();
        
    if (!localStorage.getItem('phone')) {
        const phoneNumber = generatePhoneNumber();
        localStorage.setItem('phone', phoneNumber);
    }
    
    loadProfileData();

    $('#edit-btn').click(function() {
        enableEditing(true);
    });
    
    $('#cancel-btn').click(function() {
        enableEditing(false);
        loadProfileData();
    });
    
    $('#profile-form').submit(function(e) {
        e.preventDefault();
        saveProfileData();
    });
})

function checkLoginState() {
    const username = localStorage.getItem('uName');
    if (!username) {
        window.location.href = 'login.html';
    }
    updateNavigation(username);
}

function updateNavigation(username) {
    if(username){
    const loginRegisterLi = $('.dropdown:last');
    loginRegisterLi.html(`
        <a href="#" class="user-profile">${username} ▼</a>
        <ul class="dropdown-content">
            <li><a href="profile.html">Profile</a></li>
            <li><a href="#" onclick="handleLogout(event)">Logout</a></li>
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
    localStorage.removeItem('phone')
    window.location.href = 'index.html';
}

function loadProfileData() {
    const username = localStorage.getItem('uName');
    const email = `${username}@gmail.com`;
    const userType = localStorage.getItem('userType') || 'customer';
    
    let phone = localStorage.getItem('phone');
    if (!phone) {
        phone = Math.floor(10000000 + Math.random() * 90000000).toString();
        localStorage.setItem('phone', phone);
    }
    
    $('#username').val(username);
    $('#email').val(email);
    $('#phone').val(phone);
    $('#userType').val(userType || 'customer');
    
    if (!localStorage.getItem('email')) {
        localStorage.setItem('email', email);
    }
}

function generatePhoneNumber() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function enableEditing(enable) {
    $('#username').prop('disabled', true);
    $('#email').prop('disabled', !enable);
    $('#phone').prop('disabled', !enable);
    $('#userType').prop('disabled', true);
    
    if (enable) {
        $('#edit-btn').hide();
        $('#save-btn').show();
        $('#cancel-btn').show();
    } else {
        $('#edit-btn').show();
        $('#save-btn').hide();
        $('#cancel-btn').hide();
    }
}

function saveProfileData() {
    const updatedData = {
        email: $('#email').val(),
        phone: $('#phone').val()
    };
    
    localStorage.setItem('email', updatedData.email);
    localStorage.setItem('phone', updatedData.phone);
    
    enableEditing(false);
    alert('Profile updated successfully!');
}

function back() {
    const userType = localStorage.getItem('userType');
    
    if (userType === 'vehicleSalesperson') {
        window.location.href = 'managerprocess.html';
    } else if(userType === 'insuranceSalesperson'){
        window.location.href = '.html'
    } else {
        window.location.href = 'index.html';
    }
}