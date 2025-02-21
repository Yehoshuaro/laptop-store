// Register user
document.getElementById("registerForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const result = await response.json();
    alert(result.message);
    if (result.success) window.location.href = "catalog.html";
});

// Login user
document.getElementById("loginForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;

    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    alert(result.message);
    if (result.success) window.location.href = "catalog.html";
});

// Load laptops
async function loadLaptops() {
    const response = await fetch("/laptops");
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
<!--            <p>Category: ${laptop.specifications}</p>-->
            <p>${laptop.in_stock ? "In Stock" : "Out of Stock"}</p>
        `;
        laptopList.appendChild(div);
    });
}

// Load laptops only if on catalog page
if (document.getElementById("laptopList")) {
    loadLaptops();
}
