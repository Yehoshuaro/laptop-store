document.addEventListener("DOMContentLoaded", function () {
    const userRole = localStorage.getItem("userRole");

    if (userRole !== "admin") {
        alert("Access denied. Redirecting...");
        window.location.href = "catalog.html";
    }

    loadUsers();
});
//
// async function loadUsers() {
//     try {
//         const response = await fetch("http://localhost:3000/users");
//         const users = await response.json();
//
//         const userList = document.getElementById("userList");
//         userList.innerHTML = "";
//
//         users.forEach(user => {
//             const div = document.createElement("div");
//             div.innerHTML = `
//                 <p>${user.name} (${user.email}) - Role: <strong>${user.role}</strong></p>
//                 <button onclick="deleteUser('${user._id}')">Delete</button>
//                 <button onclick="changeRole('${user._id}', '${user.role}')">Change Role</button>
//             `;
//             userList.appendChild(div);
//         });
//     } catch (error) {
//         alert("Error loading users");
//     }
// }


async function loadUsers() {
    try {
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();

        const userList = document.getElementById("userList");
        userList.innerHTML = "";

        users.forEach(user => {
            const div = document.createElement("div");
            div.innerHTML = `
                <p>${user.name} (${user.email}) - Role: <strong>${user.role}</strong></p>
                <button onclick="deleteUser('${user._id}')">Delete</button>
                <button onclick="changeRole('${user._id}', '${user.role}')">Change Role</button>
            `;
            userList.appendChild(div);
        });
    } catch (error) {
        alert("Error loading users");
    }
}

async function deleteUser(userId) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "DELETE"
        });

        const result = await response.json();
        alert(result.message);
        loadUsers();
    } catch (error) {
        alert("Error deleting user");
    }
}
//
// async function changeRole(userId, currentRole) {
//     const newRole = prompt("Enter new role (admin, seller, customer):", currentRole);
//     if (!newRole || (newRole !== "admin" && newRole !== "seller" && newRole !== "customer")) {
//         alert("Invalid role. Must be 'admin', 'seller', or 'customer'.");
//         return;
//     }
//
//     try {
//         const response = await fetch(`http://localhost:3000/users/${userId}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ role: newRole })
//         });
//
//         const result = await response.json();
//         alert(result.message);
//         loadUsers();
//     } catch (error) {
//         alert("Error updating role");
//     }
// }

async function changeRole(userId, currentRole) {
    const newRole = prompt("Enter new role (admin, seller, customer):", currentRole);
    if (!newRole || (newRole !== "admin" && newRole !== "seller" && newRole !== "customer")) {
        alert("Invalid role. Must be 'admin', 'seller', or 'customer'.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: newRole })
        });

        const result = await response.json();
        alert(result.message);
        loadUsers();
    } catch (error) {
        alert("Error updating role");
    }
}

document.getElementById("addUserForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("newUserName").value;
    const email = document.getElementById("newUserEmail").value;
    const password = document.getElementById("newUserPassword").value;
    const role = document.getElementById("newUserRole").value;

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role })
        });

        const result = await response.json();
        alert(result.message);
        if (result.success) {
            document.getElementById("addUserForm").reset();
            loadUsers();
        }
    } catch (error) {
        alert("Error adding user");
    }
});
