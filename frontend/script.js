document.addEventListener("DOMContentLoaded", () => {
    const usersList = document.getElementById("users-list");
    const logoutButton = document.getElementById("logout");

    async function fetchUsers() {
        try {
            const response = await fetch("/api/users");
            const users = await response.json();
            renderUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    function renderUsers(users) {
        usersList.innerHTML = "";
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;
            usersList.appendChild(row);
        });
    }

    async function deleteUser(id) {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await fetch(`/api/users/${id}`, { method: "DELETE" });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    logoutButton.addEventListener("click", () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login.html";
    });

    fetchUsers();
});
