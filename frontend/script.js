document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const result = await response.json();
    alert(result.message);
});

// Загрузка ноутбуков
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
            <p>Бренд: ${laptop.brand}</p>
            <p>Цена: ${laptop.price}₽</p>
            <p>Категория: ${laptop.category}</p>
            <p>${laptop.in_stock ? "В наличии" : "Нет в наличии"}</p>
        `;
        laptopList.appendChild(div);
    });
}

loadLaptops();
