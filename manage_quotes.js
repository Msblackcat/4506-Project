$(document).ready(function () {
    const quotes = [
        { id: "Q12345", customer: "John Doe", type: "Auto", status: "Pending" },
        { id: "Q67890", customer: "Jane Smith", type: "Health", status: "Approved" },
        { id: "Q11223", customer: "Chris Evans", type: "Home", status: "Rejected" },
    ];

    function renderQuotes(filter = "all", searchQuery = "") {
        const container = $(".quotes-container");
        container.empty();

        const filteredQuotes = quotes.filter((quote) => {
            if (filter !== "all" && quote.status.toLowerCase() !== filter) {
                return false;
            }
            if (searchQuery && !quote.customer.toLowerCase().includes(searchQuery.toLowerCase()) && !quote.id.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            return true;
        });

        filteredQuotes.forEach((quote) => {
            container.append(`
                <div class="quote-card">
                    <h3>${quote.customer}</h3>
                    <p><strong>Quote ID:</strong> ${quote.id}</p>
                    <p><strong>Type:</strong> ${quote.type}</p>
                    <p><strong>Status:</strong> ${quote.status}</p>
                    <div class="btn-group">
                        <button class="btn approve-btn">Approve</button>
                        <button class="btn reject-btn">Reject</button>
                        <button class="btn details-btn">View Details</button>
                    </div>
                </div>
            `);
        });
    }

    $("#search-button").on("click", function () {
        const searchQuery = $("#search-box").val();
        const filter = $("#filter-status").val();
        renderQuotes(filter, searchQuery);
    });

    renderQuotes(); // Initial render
});
