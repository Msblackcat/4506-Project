$(document).ready(function () {

    $("#add-quote-btn").on("click", function () {
        $("#quote-form-section").show(); 
    });


    $("#submit-quote-btn").on("click", function () {
        const customerName = $("#customer-name").val();
        const licensePlate = $("#license-plate").val();
        const carModel = $("#car-model").val();
        const estimatedValue = parseFloat($("#estimated-value").val());
        const insurancePlan = $("#insurance-plan").val();


        if (!customerName || !licensePlate || !carModel || isNaN(estimatedValue) || !insurancePlan) {
            alert("Please fill in all fields!");
            return;
        }


        let quoteAmount = 0;
        if (insurancePlan === "comprehensive") {
            quoteAmount = estimatedValue * 0.05; 
            quoteAmount = estimatedValue * 0.03; 
        }


        const newQuote = {
             id: "A004",
            customer: customerName,
            licensePlate: licensePlate,
            model: carModel,
            estimatedValue: `$${estimatedValue.toLocaleString()}`,
            insurancePlan: insurancePlan,
            expiryDate: "2024-12-31",
            status: "Pending"
        };

        autoQuotes.push(newQuote);


        $("#customer-name").val("");
        $("#license-plate").val("");
        $("#car-model").val("");
        $("#estimated-value").val("");
        $("#insurance-plan").val("comprehensive");


        $("#quote-form-section").hide();


        renderQuotes();
    });


    $("#cancel-btn").on("click", function () {
        $("#quote-form-section").hide();
        $("#customer-name").val("");
        $("#license-plate").val("");
        $("#car-model").val("");
        $("#estimated-value").val("");
        $("#insurance-plan").val("comprehensive");
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

    function addMessage(message, sender) {
        const messageElement = $("<div>")
            .addClass("message")
            .addClass(sender)
            .text(message);

        $("#messages").append(messageElement);

        const messagesContainer = $("#messages");
        messagesContainer.scrollTop(messagesContainer[0].scrollHeight);
    }

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

    for (let i = 0; i < notifications.length; i++) {
        $('#notification-list').append(`<li>${notifications[i]}</li>`);
    }
    const autoQuotes = [
        {
            id: "A001",
            customer: "John Doe",
            licensePlate: "AB1234",
            model: "Toyota Corolla",
            estimatedValue: "$15,000",
            insurancePlan: "Comprehensive",
            expiryDate: "2024-12-31",
            status: "Pending"
        },
        {
            id: "A002",
            customer: "Jane Smith",
            licensePlate: "CD5678",
            model: "Honda Civic",
            estimatedValue: "$20,000",
            insurancePlan: "Third-Party",
            expiryDate: "2025-01-15",
            status: "Approved"
        },
        {
            id: "A003",
            customer: "Chris Evans",
            licensePlate: "EF9012",
            model: "Ford Mustang",
            estimatedValue: "$50,000",
            insurancePlan: "Comprehensive",
            expiryDate: "2024-10-10",
            status: "Rejected"
        }
    ];

    function renderQuotes(filter = "all", searchQuery = "") {
        const container = $(".quotes-container");
        container.empty();

        const filteredQuotes = autoQuotes.filter((quote) => {
            if (filter !== "all" && quote.status.toLowerCase() !== filter) {
                return false;
            }
            if (
                searchQuery &&
                !quote.customer.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !quote.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                return false;
            }
            return true;
        });

        for (let i = 0; i < filteredQuotes.length; i++) {
            const quote = filteredQuotes[i];
            container.append(`
                <div class="quote-card" data-index="${i}">
                    <h3>${quote.customer}</h3>
                    <p><strong>Quote ID:</strong> ${quote.id}</p>
                    <p><strong>License Plate:</strong> ${quote.licensePlate}</p>
                    <p><strong>Car Model:</strong> ${quote.model}</p>
                    <p><strong>Status:</strong> <span class="status">${quote.status}</span></p>
                    <div class="btn-group">
                        <button class="btn approve-btn">Approve</button>
                        <button class="btn reject-btn">Reject</button>
                        <button class="btn details-btn">View Details</button>
                    </div>
                </div>
            `);
        }

        attachButtonListeners();
    }

    function attachButtonListeners() {
        $(".approve-btn").on("click", function () {
            const card = $(this).closest(".quote-card");
            const index = card.data("index");
            autoQuotes[index].status = "Approved";
            showNotification(`Quote ID: ${autoQuotes[index].id} has been approved.`, "success");
            renderQuotes();
        });

        $(".reject-btn").on("click", function () {
            const card = $(this).closest(".quote-card");
            const index = card.data("index");
            autoQuotes[index].status = "Rejected";
            showNotification(`Quote ID: ${autoQuotes[index].id} has been rejected.`, "error");
            renderQuotes();
        });

        $(".details-btn").on("click", function () {
            const card = $(this).closest(".quote-card");
            const index = card.data("index");
            const quote = autoQuotes[index];
            showDetailsModal(quote);
        });
    }

    function showNotification(message, type) {
        const notification = $("<div class='notification'></div>")
        .text(message)
        if (type === "success") {
            notification.addClass("success");
        } else {
            notification.addClass("error");
        }

        $(".search-filter").after(notification);

        notification.fadeIn(300).delay(2700).fadeOut(300, function () {
            $(this).remove();
        });
    }

    $("#search-button").on("click", function () {
        const searchQuery = $("#search-box").val();
        const filter = $("#filter-status").val();
        renderQuotes(filter, searchQuery);
    });

    $("#search-button").on("click", function () {
        const searchQuery = $("#search-box").val();
        const filter = $("#filter-status").val();
        renderQuotes(filter, searchQuery);
    });

    function showDetailsModal(quote) {
        const modal = $(`
            <div class="modal-overlay">
                <div class="modal">
                    <h2>Quote Details</h2>
                    <div class="details-section">
                        <h3>Customer Information</h3>
                        <table class="details-table">
                            <tr>
                                <td><strong>Customer Name:</strong></td>
                                <td><input type="text" id="edit-customer" value="${quote.customer}" /></td>
                            </tr>
                            <tr>
                                <td><strong>License Plate:</strong></td>
                                <td><input type="text" id="edit-license-plate" value="${quote.licensePlate}" /></td>
                            </tr>
                        </table>
                    </div>
                    <div class="details-section">
                        <h3>Vehicle Information</h3>
                        <table class="details-table">
                            <tr>
                                <td><strong>Car Model:</strong></td>
                                <td><input type="text" id="edit-car-model" value="${quote.model}" /></td>
                            </tr>
                            <tr>
                                <td><strong>Estimated Value:</strong></td>
                                <td><input type="number" id="edit-estimated-value" value="${quote.estimatedValue.replace('$','').replace(',','')}" /></td>
                            </tr>
                        </table>
                    </div>
                    <div class="details-section">
                        <h3>Insurance Information</h3>
                        <table class="details-table">
                            <tr>
                                <td><strong>Insurance Plan:</strong></td>
                            <td>
                                <select id="edit-insurance-plan">
                                    <option value="comprehensive" ${quote.insurancePlan === 'comprehensive' ? 'selected' : ''}>Comprehensive</option>
                                    <option value="third-party" ${quote.insurancePlan === 'third-party' ? 'selected' : ''}>Third-Party</option>
                                </select>
                            </td>
                            </tr>
                            <tr>
                                <td><strong>Expiry Date:</strong></td>
                                <td><input type="date" id="edit-expiry-date" value="${quote.expiryDate}" /></td>
                            </tr>
                            <tr>
                                <td><strong>Status:</strong></td>
                                <td><input type="text" id="edit-status" value="${quote.status}" readonly /></td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-actions">
                        <button class="btn save-btn">Save</button>
                        <button class="btn cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>
        `);

        $("body").append(modal);


        modal.find(".cancel-btn").on("click", function () {
            modal.remove();
        });


        modal.find(".save-btn").on("click", function () {
            quote.customer = $("#edit-customer").val();
            quote.licensePlate = $("#edit-license-plate").val();
            quote.model = $("#edit-car-model").val();
            quote.estimatedValue = `$${$("#edit-estimated-value").val()}`;
            quote.insurancePlan = $("#edit-insurance-plan").val();
            quote.expiryDate = $("#edit-expiry-date").val();

            modal.remove();
            renderQuotes();
        });


        modal.on("click", function (e) {
            if ($(e.target).is(".modal-overlay")) {
                modal.remove();
            }
        });
    }



    $("#search-button").on("click", function () {
        const searchQuery = $("#search-box").val();
        const filter = $("#filter-status").val();
        renderQuotes(filter, searchQuery);
    });

    renderQuotes();

    
});
