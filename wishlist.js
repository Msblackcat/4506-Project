$(document).ready(function() {
    initializeEventListeners();
    checkLoginState();
    window.handleLogout = handleLogout;
});

const WishlistManager = {
    checkLoginState: function() {
        const username = localStorage.getItem('uName');
        if (username) {
            this.updateNavigation(username);
            this.loadWishlistItems();
        } else {
            window.location.href = 'login.html';
        }
    },

    updateNavigation: function(username) {
        const loginRegisterLi = $('.dropdown:last');
        if (username) {
            loginRegisterLi.html(`
                <a href="#" class="user-profile">${username} ▼</a>
                <ul class="dropdown-content">
                    <li><a href="profile.html">Profile</a></li>
                    <li><a href="login.html" onclick="handleLogout(event)">Logout</a></li>
                </ul>
            `);
        }
    },

    loadWishlistItems: function() {
        const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        const container = $('.wishlist-container');

        if (wishlistItems.length === 0) {
            container.html(`
                <div class="empty-wishlist">
                    <h2>Your wishlist is empty</h2>
                    <p>Browse our collection and add some cars to your wishlist!</p>
                    <a href="Viewmore.html" class="purchase-btn">Browse Cars</a>
                </div>
            `);
            return;
        }

        container.empty();
        wishlistItems.forEach(item => {
            container.append(`
                <div class="wishlist-item" data-id="${item.id}">
                    <div class="wishlist-photo">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="wishlist-details">
                        <div>
                            <h3>${item.name}</h3>
                            <p>Year: ${item.year}</p>
                            <p>Mileage: ${item.mileage}</p>
                            <p>Engine: ${item.engine}</p>
                            <div class="price">${item.price}</div>
                        </div>
                        <div class="wishlist-actions">
                            <button class="remove-btn" onclick="removeFromWishlist(${item.id})">Remove</button>
                            <button class="purchase-btn" onclick="purchaseItem(${item.id})">Purchase</button>
                        </div>
                    </div>
                </div>
            `);
        });
    }
};

function initializeEventListeners() {
    $('.dropdown').hover(
        function() { $(this).children('.dropdown-content').show(); },
        function() { $(this).children('.dropdown-content').hide(); }
    );
}

function removeFromWishlist(itemId) {
    const item = $(`.wishlist-item[data-id="${itemId}"]`);
    item.addClass('delete-animation');
    
    setTimeout(() => {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist = wishlist.filter(item => item.id !== itemId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        item.remove();
        
        if (wishlist.length === 0) {
            $('.wishlist-container').html(`
                <div class="empty-wishlist">
                    <h2>Your wishlist is empty</h2>
                    <p>Browse our collection and add some cars to your wishlist!</p>
                    <a href="Viewmore.html" class="purchase-btn" onclick="purchaseItem("this)">Browse Cars</a>
                </div>
            `);
        }
    }, 500);
}

function purchaseItem(itemId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const purchasedItem = wishlist.find(item => item.id === itemId);
    
    if (purchasedItem) {
        const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
        const purchase = {
            ...purchasedItem,
            purchaseDate: new Date().toISOString(),
            purchaseId: generatePurchaseId()
        };
        
        purchases.push(purchase);
        localStorage.setItem('purchases', JSON.stringify(purchases));
        
        removeFromWishlist(itemId);
    }
    
    window.location.href = 'purchase.html';
}

function generatePurchaseId() {
    return 'PUR' + Date.now() + Math.random().toString(36).substr(2, 5);
}

function removeFromWishlist(itemId) {
    const item = $(`.wishlist-item[data-id="${itemId}"]`);
    item.addClass('delete-animation');
    
    setTimeout(() => {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist = wishlist.filter(item => item.id !== itemId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        item.remove();
        
        if (wishlist.length === 0) {
            $('.wishlist-container').html(`
                <div class="empty-wishlist">
                    <h2>Your wishlist is empty</h2>
                    <p>Browse our collection and add some cars to your wishlist!</p>
                    <a href="Viewmore.html" class="purchase-btn">Browse Cars</a>
                </div>
            `);
        }
    }, 500);
}

function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('uName');
    localStorage.removeItem('userType');
    localStorage.removeItem('email');
    localStorage.removeItem('permissions');
    localStorage.removeItem('staffNumber');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

function checkLoginState() {
    WishlistManager.checkLoginState();
}