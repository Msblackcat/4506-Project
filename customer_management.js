document.addEventListener("DOMContentLoaded", function () {

    const customerTable = document.querySelector(".customer-table");

    customerTable.addEventListener("click", function (event) {
        const editBtn = event.target && event.target.classList.contains("edit-btn");
        const deleteBtn = event.target && event.target.classList.contains("delete-btn");
        const saveBtn = event.target && event.target.classList.contains("save-btn");


        if (editBtn) {
            const row = event.target.closest("tr"); 
            const inputFields = row.querySelectorAll("input");
            for (let i = 0; i < inputFields.length; i++) {
                inputFields[i].removeAttribute("readonly");
            }


            row.querySelector(".edit-btn").style.display = "none";
            row.querySelector(".save-btn").style.display = "inline-block";
        }


        if (deleteBtn) {
            const row = event.target.closest("tr");
            row.remove();
        }

        if (saveBtn) {
            const row = event.target.closest("tr"); 
            const inputFields = row.querySelectorAll("input");
            for (let i = 0; i < inputFields.length; i++) {
                inputFields[i].setAttribute("readonly", "true");
            }

            row.querySelector(".save-btn").style.display = "none";
            row.querySelector(".edit-btn").style.display = "inline-block";
        }
    });
});
