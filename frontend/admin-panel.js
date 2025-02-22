document.addEventListener("DOMContentLoaded", () => {
    populateUsers();

    document.getElementById("searchInput").addEventListener("input", searchUsers);
});

function loadUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function populateUsers() {
    const users = loadUsers();
    const userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";

    users.forEach((user, index) => {
        userTableBody.innerHTML += `
            <tr id="user-${index}">
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>${user.role}</td>
                <td>
                    <button class="edit-btn" onclick="editUser(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function editUser(index) {
    const users = loadUsers();
    const row = document.getElementById(`user-${index}`).children;

    users[index].username = row[0].innerText.trim();
    users[index].email = row[1].innerText.trim();
    users[index].password = row[2].innerText.trim();
    users[index].role = row[3].innerText.trim();

    saveUsers(users);
    alert("User updated successfully!");
}

function deleteUser(index) {
    if (confirm("Are you sure you want to delete this user?")) {
        const users = loadUsers();
        users.splice(index, 1);
        saveUsers(users);
        populateUsers();
        alert("User deleted successfully!");
    }
}

function searchUsers() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    Array.from(document.getElementById("userTableBody").rows).forEach(row => {
        const username = row.cells[0].innerText.toLowerCase();
        const email = row.cells[1].innerText.toLowerCase();
        row.style.display = (username.includes(searchValue) || email.includes(searchValue)) ? "" : "none";
    });
}
