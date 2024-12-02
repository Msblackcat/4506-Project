$(document).ready(function() {
    checkLoginState();
    initializeHistory();
});

function initializeHistory() {
    if (!localStorage.getItem('purchaseHistory')) {
        const samplePurchaseHistory = [{
            transactionId: "TX123456",
            purchaseDate: new Date().toISOString(),
            insurance: "Full Coverage",
            warranty: "2 Years",
            paymentMethod: "Credit Card",
            status: "pending",
            item: {
                name: "Ms Go",
                year: 2024,
                mileage: 0,
                engine: "3.0L Twin-Turbo",
                price: 20000,
                color: "White"
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
}

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
    for (let i = 0; i < purchaseHistory.length; i++) {
        const purchase = purchaseHistory[i];
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
                <div class="processing-time">
                    <strong>Estimated Processing Time:</strong> 
                    <span class="highlight">1-3 business days</span>
                </div>
                <div class="history-section">
                    <h3>Product Information</h3>
                    <p><strong>Model:</strong> ${purchase.item.name}</p>
                    <p><strong>Color:</strong> ${purchase.item.color}</p>
                    <p><strong>Engine:</strong> ${purchase.item.engine}</p>
                    <p><strong>Price:</strong> $${purchase.item.price.toLocaleString()}</p>
                </div>
                <div class="history-section">
                    <h3>Insurance & Warranty</h3>
                    <p><strong>Insurance:</strong> ${purchase.insurance}</p>
                    <p><strong>Warranty:</strong> ${purchase.warranty}</p>
                </div>
                <div class="history-section">
                    <h3>Payment Information</h3>
                    <p><strong>Payment Method:</strong> ${purchase.paymentMethod}</p>
                </div>
                <div class="status-container">
                    <span class="status-heading">Status: </span>
                    ${statusHTML}
                </div>
            </div>
        `;
    }

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
    localStorage.removeItem('phone');
    window.location.href = 'index.html';
}