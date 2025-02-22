document.getElementById("registerForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Registration failed");
        }

        alert(result.message);
        window.location.href = "catalog.html"; // Redirect only on success
    } catch (error) {
        alert("Error: " + error.message);
    }
});


document.getElementById("loginForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Login failed");
        }

        alert("Login successful!");

        localStorage.setItem("userRole", result.role);

        if (result.role === "admin") {
            window.location.href = "admin-panel.html";
        } else if (result.role === "seller") {
            window.location.href = "seller-dashboard.html";
        } else {
            window.location.href = "catalog.html"; // Default for customers
        }
    } catch (error) {
        alert(error.message);
    }
});

async function loadLaptops() {
    try {
        const response = await fetch("http://localhost:3000/laptops");
        if (!response.ok) throw new Error("Failed to load laptops");

        const laptops = await response.json();

        const laptopList = document.getElementById("laptopList");
        laptopList.innerHTML = "";
        laptops.forEach(laptop => {
            const div = document.createElement("div");
            div.className = "laptop";
            div.innerHTML = `
                <h3>${laptop.name}</h3>
                <p>Brand: ${laptop.brand}</p>
                <p>Price: $${laptop.price}</p>
                <p>Category: ${laptop.category}</p>
                <p>${laptop.in_stock ? "In Stock" : "Out of Stock"}</p>
            `;
            laptopList.appendChild(div);
        });
    } catch (error) {
        console.error("Error loading laptops:", error);
        alert("Could not load laptops.");
    }
}

if (document.getElementById("laptopList")) {
    loadLaptops();
}

