document.addEventListener('DOMContentLoaded', function() {
    const selectedPlan = localStorage.getItem('selectedInsurancePlan');
    const insurancePlanButton = document.getElementById('insurancePlanButton');
    
    if (selectedPlan) {
        insurancePlanButton.textContent = selectedPlan;
        insurancePlanButton.style.backgroundColor = '#4CAF50';
    }
});

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
    window.location.href = 'index.html';
}

    const username = localStorage.getItem('uName');
    if (!username) {
        window.location.href = 'login.html';
    }

    const currentCarPurchase = JSON.parse(localStorage.getItem('purchases'));
    if (!currentCarPurchase) {
        window.location.href = 'wishlist.html';
        return;
    }

    $(".carousel-image").attr("src", `4506_source/product1_black.png`);
    $("#carName").text(currentCarPurchase.name);
    $("#carPrice").text(currentCarPurchase.price);
    $("#carSpecs").html(`
        <p><strong>Year:</strong> ${currentCarPurchase.year}</p>
        <p><strong>Mileage:</strong> ${currentCarPurchase.mileage}</p>
        <p><strong>Engine:</strong> ${currentCarPurchase.engine}</p>
    `);

    $(".option-button").hover(
        function() {
            if (!$(this).hasClass("selected")) {
                $(this).css({
                    "background-color": "#007bff",
                    "color": "white",
                    "border-color": "#007bff"
                });
            }
        },
        function() {
            if (!$(this).hasClass("selected")) {
                $(this).css({
                    "background-color": "white",
                    "color": "black",
                    "border-color": "#ccc"
                });
            }
        }
    );

    $(".option-button").click(function() {
        $(this).siblings().removeClass("selected").css({
            "background-color": "white",
            "color": "black",
            "border-color": "#ccc"
        });

        $(this).addClass("selected").css({
            "background-color": "#007bff",
            "color": "white",
            "border-color": "#007bff"
        });

        if ($(this).data("payment") === "Visa") {
            $("#credit-card-info").slideDown();
        } else {
            $("#credit-card-info").slideUp();
        }

        var color = $(this).data("color");
        if (color) {
            $(".carousel-image").attr("src", `4506_source/product1_${color}.png`);
        }
    });

    $(".buy-now-button").click(function() {
        const color = $(".option-button[data-color].selected").text();
        const insurance = $("#insurance-company").val();
        const warranty = $(".option-button[data-warranty].selected").text();
        const paymentMethod = $(".option-button[data-payment].selected").text();
        const transactionId = 'TRX' + Date.now();
        const purchaseDate = new Date().toISOString();

        if (!color || !insurance || !warranty || !paymentMethod) {
            alert("Please complete all fields before confirming your purchase.");
            return;
        }

        if (paymentMethod === "Visa") {
            const cardNumber = $("#card-number").val();
            const cardExpiry = $("#card-expiry").val();
            const cardCVV = $("#card-cvv").val();

            if (!cardNumber || !cardExpiry || !cardCVV) {
                alert("Please enter your credit card details for Visa payment.");
                return;
            }
        }

        const purchaseData = {
            transactionId,
            purchaseDate,
            item: {
                ...currentCarPurchase,
                color: color,
            },
            insurance: insurance,
            warranty: warranty,
            paymentMethod: paymentMethod,
        };

        let purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
        purchaseHistory.push(purchaseData);
        localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist = wishlist.filter(item => item.id !== currentCarPurchase.id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        let receiptHtml = `
            <div class="receipt-overlay">
                <div class="receipt">
                    <h2>Purchase Receipt</h2>
                    <p><strong>Transaction ID:</strong> ${transactionId}</p>
                    <p><strong>Purchase Date:</strong> ${purchaseDate}</p>
                    <p><strong>Product:</strong>Ms go</p>
                    <p><strong>Price:</strong> $20000</p>
                    <p><strong>Color:</strong> ${color}</p>
                    <p><strong>Year:</strong>2017</p>
                    <p><strong>Mileage:</strong>0 kilometer</p>
                    <p><strong>Engine:</strong>6.5 Ms V12</p>
                    <p><strong>Insurance Company:</strong> ${insurance}</p>
                    <p><strong>Warranty:</strong> ${warranty}</p>
                    <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                    <button class="confirm-receipt-button">confirm purchase</button>
                </div>
            </div>
        `;

        $("body").append(receiptHtml);

        $(".receipt-overlay").css({
            "position": "fixed",
            "top": "0",
            "left": "0",
            "width": "100%",
            "height": "100%",
            "background-color": "rgba(0, 0, 0, 0.5)",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "z-index": "1000"
        });

        $(".receipt").css({
            "background-color": "white",
            "padding": "20px",
            "border-radius": "8px",
            "box-shadow": "0 4px 8px rgba(0, 0, 0, 0.2)",
            "width": "80%",
            "max-width": "500px",
            "text-align": "left"
        });

        $(".confirm-receipt-button").click(function() {
            const confirmationMessage = `Please confirm your payment details:
    
        Product: Ms go
        Base Price: $200000
        Insurance Plan: ${localStorage.getItem('selectedInsurancePlan')}
        Total Price: $200000
        Color: ${color}
        Insurance Company: ${insurance}
        Warranty: ${warranty}
        Payment Method: ${paymentMethod}

        Click OK to proceed with payment.`;

    if (confirm(confirmationMessage)) {
        const verificationCode = generateVerificationCode();
        
        alert(`Your verification code is: ${verificationCode}`);

        const userInput = prompt("Please enter the verification code:");

        if (userInput === verificationCode) {
            const transactionId = 'TRX' + Date.now();
            const purchaseDate = new Date().toISOString();
            
            window.location.href = "history.html"
    }
};
    
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function processPurchase() {
    const purchaseData = {
        transactionId,
        purchaseDate,
        item: {
            ...currentCarPurchase,
            color: color,
        },
        insurance: insurance,
        warranty: warranty,
        paymentMethod: paymentMethod,
    };

    let purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    purchaseHistory.push(purchaseData);
    localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(item => item.id !== currentCarPurchase.id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    let receiptHtml = `
        <div class="receipt-overlay">
            <div class="receipt">
                <h2>Purchase Receipt</h2>
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
                <p><strong>Purchase Date:</strong> ${purchaseDate}</p>
                <p><strong>Product:</strong> ${currentCarPurchase.name}</p>
                <p><strong>Base Price:</strong> ${currentCarPurchase.price}</p>
                <p><strong>Insurance Plan:</strong> ${localStorage.getItem('selectedInsurancePlan')}</p>
                <p><strong>Total Price:</strong> $${parseFloat(localStorage.getItem('totalPurchasePrice')).toLocaleString()}</p>
                <p><strong>Color:</strong> ${color}</p>
                <p><strong>Year:</strong> ${currentCarPurchase.year}</p>
                <p><strong>Mileage:</strong> ${currentCarPurchase.mileage}</p>
                <p><strong>Engine:</strong> ${currentCarPurchase.engine}</p>
                <p><strong>Insurance Company:</strong> ${insurance}</p>
                <p><strong>Warranty:</strong> ${warranty}</p>
                <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                <button class="close-receipt-button">Close Receipt</button>
            </div>
        </div>
    `;
}
           //$(".receipt-overlay").remove();
           ;
        });
    });
});