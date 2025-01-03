document.addEventListener('DOMContentLoaded', function() {
    const selectedPlan = localStorage.getItem('selectedInsurancePlan');
    const insurancePlanButton = document.getElementById('insurancePlanButton');
    
    if (selectedPlan) {
        insurancePlanButton.textContent = selectedPlan;
        insurancePlanButton.style.backgroundColor = '#4CAF50';
    }
});

function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('uName');
    localStorage.removeItem('userType');
    localStorage.removeItem('email');
    localStorage.removeItem('permissions');
    localStorage.removeItem('staffNumber');
    localStorage.removeItem('username');
    localStorage.removeItem('wishlist');
    localStorage.removeItem('phone');
    window.location.href = 'index.html';
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
                <li><a href="login.html" onclick="handleLogout(event)">Logout</a></li>
            </ul>
        `);
        }
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
    
        const verificationCode = Math.floor(1000 + Math.random() * 9000);
        
        const verificationHtml = `
            <div class="verification-overlay">
                <div class="verification-box">
                    <h3>Verification Code</h3>
                    <p>Please enter the verification code: <strong>${verificationCode}</strong></p>
                    <input type="text" id="verification-input" placeholder="Verification code">
                    <div class="verification-buttons">
                        <button id="verify-button">Verify</button>
                        <button id="cancel-verification">Cancel</button>
                    </div>
                </div>
            </div>
        `;
    
        $("body").append(verificationHtml);
    
        $(".verification-overlay").css({
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
    
        $(".verification-box").css({
            "background-color": "#ffffff",
            "padding": "20px",
            "border-radius": "10px",
            "box-shadow": "0 4px 10px rgba(0, 0, 0, 0.2)",
            "text-align": "center",
            "width": "300px"
        });
    
        $("#verification-input").css({
            "width": "150px",
            "padding": "8px",
            "margin": "15px 0",
            "text-align": "center",
            "font-size": "18px"
        });
    
        $(".verification-buttons button").css({
            "margin": "5px",
            "padding": "8px 20px",
            "border": "none",
            "border-radius": "5px",
            "cursor": "pointer"
        });
    
        $("#verify-button").css({
            "background-color": "#007bff",
            "color": "white"
        });
    
        $("#cancel-verification").css({
            "background-color": "#dc3545",
            "color": "white"
        });
    
        $("#verify-button").click(function() {
            const inputCode = $("#verification-input").val();
            if (inputCode == verificationCode) {
                $(".verification-overlay").remove();
                
                const processingHtml = `
                    <div class="processing-overlay">
                        <div class="processing-box">
                            <h3>Processing Your Purchase</h3>
                            <p>Please wait while we process your transaction...</p>
                            <div class="spinner"></div>
                        </div>
                    </div>
                `;
    
                $("body").append(processingHtml);
    
                $(".processing-overlay").css({
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
    
                $(".processing-box").css({
                    "background-color": "#ffffff",
                    "padding": "20px",
                    "border-radius": "10px",
                    "text-align": "center",
                    "box-shadow": "0 4px 10px rgba(0, 0, 0, 0.2)"
                });
    
                $(".spinner").css({
                    "border": "4px solid #f3f3f3",
                    "border-top": "4px solid #007bff",
                    "border-radius": "50%",
                    "width": "40px",
                    "height": "40px",
                    "animation": "spin 1s linear infinite",
                    "margin": "20px auto"
                });
    

                $("<style>")
                    .prop("type", "text/css")
                    .html(`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `)
                    .appendTo("head");
    
                setTimeout(function() {
                    $(".processing-overlay").remove();
                    
                    const transactionId = 'TRX' + Date.now();
                    const purchaseDate = new Date().toISOString();
                    const purchaseData = {
                        transactionId,
                        purchaseDate,
                        status: "pending",
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

                    let receiptHtml = `
    <div class="receipt-overlay">
        <div class="receipt">
            <h2 class="receipt-title">Purchase Receipt</h2>
            <div class="receipt-section">
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
                <p><strong>Purchase Date:</strong> ${purchaseDate}</p>
                <p><strong>Status:</strong> <span class="status pending">Pending</span></p>
            </div>
            <div class="receipt-section">
                <h3>Product Information</h3>
                <p><strong>Product:</strong> Ms go </p>
                <p><strong>Base Price:</strong> HK$20000 </p>
                <p><strong>Color:</strong> ${color}</p>
            </div>
            <div class="receipt-section">
                <h3>Insurance & Warranty</h3>
                <p><strong>Insurance Company:</strong> ${insurance}</p>
                <p><strong>Warranty:</strong> ${warranty}</p>
            </div>
            <div class="receipt-section">
                <h3>Payment Details</h3>
                <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                <p><strong>Estimated Processing Time:</strong> 1-3 business days</p>
            </div>
            <button class="close-receipt-button">Close Receipt</button>
        </div>
    </div>
`;
        
        $("body").append(receiptHtml);
        
        $("<style>")
            .prop("type", "text/css")
            .html(`
                .status {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-weight: bold;
                }
                .status.pending {
                    background-color: #fff3cd;
                    color: #856404;
                }
            `)
            .appendTo("head");
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
            "background-color": "#ffffff",
            "padding": "20px",
            "border-radius": "10px",
            "box-shadow": "0 4px 10px rgba(0, 0, 0, 0.2)",
            "width": "90%",
            "max-width": "600px",
            "font-family": "'Arial', sans-serif",
            "text-align": "left",
            "line-height": "1.6",
        });
        
        $(".receipt-title").css({
            "font-size": "1.8rem",
            "font-weight": "bold",
            "margin-bottom": "15px",
            "color": "#2c5282",
            "text-align": "center",
        });
        
        $(".receipt-section").css({
            "margin-bottom": "15px",
            "padding-bottom": "10px",
            "border-bottom": "1px solid #ccc",
        });
        
        $(".receipt-section h3").css({
            "font-size": "1.2rem",
            "color": "#2c5282",
            "margin-bottom": "10px",
        });
        
        $(".close-receipt-button").css({
            "background-color": "#007bff",
            "color": "#ffffff",
            "border": "none",
            "padding": "10px 20px",
            "border-radius": "5px",
            "font-size": "1rem",
            "cursor": "pointer",
            "display": "block",
            "margin": "20px auto 0",
        });
        
        $(".close-receipt-button:hover").css({
            "background-color": "#0056b3",
        });
    
    
        $(".close-receipt-button").click(function() {
            $(".receipt-overlay").remove();
                window.location.href = 'history.html';
                });
            }, 2000);
        } else {
            alert("");
            }
        });

            $("#cancel-verification").click(function() {
            $(".verification-overlay").remove();
        });
    });
});