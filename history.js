$(document).ready(function() {
    checkLoginState();
    loadPurchaseHistory();
});

function checkLoginState() {
    const username = localStorage.getItem('uName');
    if (!username) {
        window.location.href = 'login.html';
        return;
    }
    updateNavigation(username);
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

function loadPurchaseHistory() {
    const historyContainer = $('.history-container');
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    const userType = localStorage.getItem('userType');
    
    if (purchaseHistory.length === 0) {
        historyContainer.html('<div class="no-history">No purchase history available</div>');
        return;
    }

    // Add CSS for status styling
    addStatusStyles();
    
    let historyHTML = '';
    purchaseHistory.forEach((purchase) => {
        historyHTML += generatePurchaseHistoryItem(purchase, userType);
    });

    historyContainer.html(historyHTML);
}

function addStatusStyles() {
    $("<style>")
        .prop("type", "text/css")
        .html(`
            .status {
                padding: 6px 12px;
                border-radius: 4px;
                font-weight: bold;
                text-transform: capitalize;
            }
            .status.pending {
                background-color: #fff3cd;
                color: #856404;
            }
            .status.processing {
                background-color: #cce5ff;
                color: #004085;
            }
            .status.completed {
                background-color: #d4edda;
                color: #155724;
            }
            .status-container {
                margin-top: 15px;
                padding: 10px;
                background-color: #f8f9fa;
                border-radius: 4px;
            }
            .status-heading {
                font-weight: bold;
                margin-right: 10px;
            }
            select.status-select {
                padding: 6px;
                border-radius: 4px;
                border: 1px solid #ced4da;
            }
        `)
        .appendTo("head");
}

function generatePurchaseHistoryItem(purchase, userType) {
    const statusHTML = generateStatusHTML(purchase, userType);
    
    return `
        <div class="history-item">
            <div class="transaction-id">Transaction ID: ${purchase.transactionId}</div>
            <div class="purchase-date">Purchase Date: ${new Date(purchase.purchaseDate).toLocaleString()}</div>
            <div class="status-container">
                <span class="status-heading">Status:</span>
                ${statusHTML}
            </div>
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
        </div>
    `;
}

function generateStatusHTML(purchase, userType) {
    if (userType === 'Vehicle Salesperson' || userType === 'Insurance Salesperson') {
        return `
            <select class="status-select" onchange="updateStatus('${purchase.transactionId}', this.value)">
                <option value="pending" ${purchase.status === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="processing" ${purchase.status === 'processing' ? 'selected' : ''}>Processing</option>
                <option value="completed" ${purchase.status === 'completed' ? 'selected' : ''}>Completed</option>
            </select>`;
    }
    return `<span class="status ${purchase.status || 'pending'}">${purchase.status || 'Pending'}</span>`;
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
    loadPurchaseHistory();
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