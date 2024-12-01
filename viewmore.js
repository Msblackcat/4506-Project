const carData = {
    "name": ["Ms go","Ms safe","Koala Gum","Koala Rice","Lignting McQueen"],
    "year": ["2017","2018","2017","2019","2006"],
    "price": ["20000","250000","300000","360000","20062006"],
    "seats": ["4","4","7","7","1"],
    "engine": ["6.5 Ms V12","7.0 Ms V13","6.5 C18","6.5 C18","MCQ1.0"],
    "fuel": ["fuels","fuels","eletronic","eletronic","Fules"],
    "transmission": ["Manual","Manual","Automatic","Automatic","Automatic"],
    "images": ["./4506_source/product1_black.png",
              "./4506_source/product2_black.png",
              "./4506_source/product3_blue.png",
              "./4506_source/product4.png",
              "./4506_source/product5.png",],
};

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
class WishlistManager {
    constructor() {
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    }

    addItem(item) {
        if (!this.isItemInWishlist(item)) {
            this.wishlist.push(item);
            this.saveWishlist();
            return true;
        }
        return false;
    }

    isItemInWishlist(item) {
        return this.wishlist.some(wishlistItem => wishlistItem.name === item.name);
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
}

class UIManager {
    static createFlyingImage(sourceImg, startPos, endPos) {
        const flyingImg = sourceImg.cloneNode();
        flyingImg.classList.add('flying-item');
        flyingImg.style.top = `${startPos.top}px`;
        flyingImg.style.left = `${startPos.left}px`;
        flyingImg.style.width = `${startPos.width}px`;
        flyingImg.style.height = `${startPos.height}px`;
        document.body.appendChild(flyingImg);

        setTimeout(() => {
            flyingImg.style.top = `${endPos.top}px`;
            flyingImg.style.left = `${endPos.left}px`;
            flyingImg.style.width = '50px';
            flyingImg.style.height = '50px';
            flyingImg.style.opacity = '0.5';
        }, 0);

        return flyingImg;
    }

    static showAlert(message) {
        alert(message);
    }
}

function generateProductCards() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    for (let i = 0; i < carData.name.length; i++) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-brand', 'Default Brand');

        card.innerHTML = `
            <img src="${carData.images[i]}" alt="${carData.name[i]}">
            <h3>${carData.name[i]}</h3>
            <p>Year: ${carData.year[i]}<br>Mileage: 0 Kilometer<br>Engine: ${carData.engine[i]}</p>
            <div class="price">HK$${carData.price[i]}</div>
            <button 
                class="details-button" 
                data-image="${carData.images[i]}"
                data-name="${carData.name[i]}"
                data-seating="${carData.seats[i]} seats" 
                data-fuel="${carData.fuel[i]}" 
                data-transmission="${carData.transmission[i]}" 
                data-engine="${carData.engine[i]}" 
                data-year="${carData.year[i]}"
                data-mileage="0 Kilometer">Details</button><br>
            <button class="cart-button" onclick="addToCart(this)">Add to WishList</button><br>
            <button class="buy-button" onclick="location.href='purchase.html'">Buy Now</button>
        `;

        productGrid.appendChild(card);
    }

    $('.details-button').click(function() {
        const data = $(this).data();
        $('#modalDetails').html(`
            <div class="modal-content-wrapper">
                <div class="modal-left">
                    <img src="${data.image}" alt="${data.name}" class="modal-image">
                </div>
                <div class="modal-right">
                    <h3>Vehicle Details</h3>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Year:</strong> ${data.year}</p>
                    <p><strong>Seating Capacity:</strong> ${data.seating}</p>
                    <p><strong>Fuel Type:</strong> ${data.fuel}</p>
                    <p><strong>Transmission:</strong> ${data.transmission}</p>
                    <p><strong>Engine:</strong> ${data.engine}</p>
                    <p><strong>Mileage:</strong> ${data.mileage}</p>
                </div>
            </div>
        `);
        $('#detailsModal').fadeIn();
    });

    $('.close, #detailsModal').click(function(e) {
        if (e.target === this) {
            $('#detailsModal').fadeOut();
        }
    });

}

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
    const wishlistManager = new WishlistManager();
    generateProductCards();

    window.addToCart = function(button) {
        const username = localStorage.getItem('uName');
        if (!username) {
            UIManager.showAlert('Please login to add items to wishlist');
            window.location.href = 'login.html';
            return;
        }

        const productCard = button.closest('.product-card');
        const item = {
            id: Date.now(),
            image: productCard.querySelector('img').src,
            name: productCard.querySelector('h3').innerText,
            year: productCard.querySelector('p').innerText.split('\n')[0].split(': ')[1],
            mileage: productCard.querySelector('p').innerText.split('\n')[1].split(': ')[1],
            engine: productCard.querySelector('p').innerText.split('\n')[2].split(': ')[1],
            price: productCard.querySelector('.price').innerText
        };

        if (wishlistManager.addItem(item)) {
            const sourceImg = productCard.querySelector('img');
            const wishlistBtn = document.querySelector('.nav-links li:nth-child(3) a');
            const flyingImg = UIManager.createFlyingImage(
                sourceImg,
                sourceImg.getBoundingClientRect(),
                wishlistBtn.getBoundingClientRect()
            );

            wishlistBtn.classList.add('wishlist-animation');
            setTimeout(() => {
                flyingImg.remove();
                wishlistBtn.classList.remove('wishlist-animation');
                UIManager.showAlert('Item added to wishlist successfully!');
            }, 800);
        } else {
            UIManager.showAlert('This item is already in your wishlist!');
        }
    };

    function applyFilters() {
        const searchValue = $('#searchBar').val().toLowerCase();
        const selectedBrand = $('#Filter').val();
        const selectedPriceRange = $('#priceFilter').val();
    
        $('.product-card').each(function() {
            const card = $(this);
            const title = card.find('h3').text().toLowerCase();
            const price = parseInt(card.find('.price').text().replace(/[^0-9]/g, ''));
    
            // Check if the title matches the selected brand
            const matchesBrand = selectedBrand === 'All' || 
                (selectedBrand === 'Ms' && title.includes('ms')) ||
                (selectedBrand === 'Koala' && title.includes('koala')) ||
                (selectedBrand === 'McQueen' && title.includes('mcqueen'));
    
            // Check if price is within selected range
            const matchesPrice = checkPriceRange(price, selectedPriceRange);
    
            // Check if title matches search input
            const matchesSearch = searchValue === '' || title.includes(searchValue);
    
            card.toggle(matchesSearch && matchesBrand && matchesPrice);
        });
    }
    
    function checkPriceRange(price, range) {
        switch(range) {
            case 'All':
                return true;
            case '0-100000':
                return price <= 100000;
            case '100001-1000000':
                return price > 100000 && price <= 1000000;
            case 'above 10000000':
                return price > 10000000;
            default:
                return true;
        }
    }
        $('#searchBar').on('keyup', applyFilters);
        $('#Filter').on('change', applyFilters);
        $('#priceFilter').on('change', applyFilters);

});