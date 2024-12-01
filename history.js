$(document).ready(function() {
    checkLoginState();
    
    // Initialize sample data if no history exists
    if (!localStorage.getItem('purchaseHistory')) {
        const samplePurchaseHistory = [{
            transactionId: "TX123456",
            purchaseDate: new Date().toISOString(),
            insurance: "Full Coverage",
            warranty: "3 Years Extended",
            paymentMethod: "Credit Card",
            status: "pending",
            item: {
                name: "BMW M3",
                year: 2023,
                mileage: 0,
                engine: "3.0L Twin-Turbo",
                price: 75000,
                color: "Alpine White"
            }
        }];
        
        localStorage.setItem('purchaseHistory', JSON.stringify(samplePurchaseHistory));
    }

    const username = localStorage.getItem('uName');
    if (!username) {
        window.location.href = 'login.html';
    } else {
        displayPurchaseHistory();
    }
});

function checkLoginState() {
    const username = localStorage.getItem('uName');
    if (username) {
        updateNavigation(username);
    }
}

function updateNavigation(username) {
    const loginRegisterLi = $('.dropdown:last');
    loginRegisterLi.html(`
        <a href="#" class="user-profile">${username} ▼</a>
        <ul class="dropdown-content">
            <li><a href="profile.html">Profile</a></li>
            <li><a href="#" onclick="handleLogout(event)">Logout</a></li>
        </ul>
    `);
}

function displayPurchaseHistory() {
    const historyContainer = $('.history-container');
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    const userType = localStorage.getItem('userType');
    
    if (purchaseHistory.length === 0) {
        historyContainer.html('<div class="no-history">No purchase history available</div>');
        return;
    }

    let historyHTML = '';
    purchaseHistory.forEach((purchase) => {
        // Generate status HTML based on user type
        let statusHTML = '';
        if (userType === 'Vehicle Salesperson' || userType === 'Insurance Salesperson') {
            statusHTML = `
                <select onchange="updateStatus('${purchase.transactionId}', this.value)">
                    <option value="pending" ${purchase.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="processing" ${purchase.status === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="completed" ${purchase.status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>`;
        } else {
            statusHTML = `<span class="status ${purchase.status || 'pending'}">${purchase.status || 'Pending'}</span>`;
        }

        historyHTML += `
            <div class="history-item">
                <div class="transaction-id">Transaction ID: ${purchase.transactionId}</div>
                <div class="purchase-date">Purchase Date: ${new Date(purchase.purchaseDate).toLocaleString()}</div>
                <div class="car-details">
                    <h3>${purchase.item.name}</h3>
                    <p>Year: ${purchase.item.year}</p>
                    <p>Color: ${purchase.item.color}</p>
                    <p>Engine: ${purchase.item.engine}</p>
                    <p>Mileage: ${purchase.item.mileage}</p>
                    <p>Price: $${purchase.item.price.toLocaleString()}</p>
                    <p>Insurance: ${purchase.insurance}</p>
                    <p>Warranty: ${purchase.warranty}</p>
                    <p>Payment Method: ${purchase.paymentMethod}</p>
                    <div class="status-container">
                        <span class="status-heading">Status: </span>
                        ${statusHTML}
                    </div>
                </div>
            </div>
        `;
    });

    historyContainer.html(historyHTML);
}

function updateStatus(transactionId, newStatus) {
    let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    
    purchaseHistory = purchaseHistory.map(purchase => {
        if (purchase.transactionId === transactionId) {
            return { ...purchase, status: newStatus };
        }
        return purchase;
    });

    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
    displayPurchaseHistory();
}

function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('uName');
    localStorage.removeItem('userType');
    localStorage.removeItem('email');
    localStorage.removeItem('permissions');
    localStorage.removeItem('staffNumber');
    localStorage.removeItem('wishlist');
    window.location.href = 'index.html';
}