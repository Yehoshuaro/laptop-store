const apiUrl = 'http://localhost:3000/laptops';

// Загружаем данные при старте
document.addEventListener('DOMContentLoaded', fetchLaptops);

function fetchLaptops() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const laptopList = document.getElementById('laptopList');
            laptopList.innerHTML = '';
            data.forEach(laptop => {
                const div = document.createElement('div');
                div.classList.add('laptop-item');
                div.innerHTML = `
                    <h3>${laptop.brand} - ${laptop.name || "Unknown Model"}</h3>
                    <p><strong>Price:</strong> $${laptop.price}</p>
                    <p><strong>Category:</strong> ${laptop.category}</p>
                    <p><strong>Status:</strong> ${laptop.in_stock ? "In Stock" : "Out of Stock"}</p>
                    <button onclick="editLaptop('${laptop._id}')">Edit</button>
                    <button onclick="deleteLaptop('${laptop._id}')">Delete</button>
                `;
                laptopList.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching laptops:', error));
}

// Добавление ноутбука
function addLaptop() {
    const brand = document.getElementById('brand').value;
    const name = document.getElementById('model').value;
    const price = document.getElementById('price').value;

    if (!brand || !name || !price) {
        alert("Please fill in all fields");
        return;
    }

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            brand,
            name,
            price: parseInt(price),
            category: "Business",
            in_stock: false
        })
    })
        .then(response => response.json())
        .then(() => fetchLaptops())
        .catch(error => console.error('Error adding laptop:', error));
}

// Удаление ноутбука
function deleteLaptop(id) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => fetchLaptops())
        .catch(error => console.error('Error deleting laptop:', error));
}

function editLaptop(id) {
    const newName = prompt("Enter new model name:");
    const newPrice = prompt("Enter new price:");

    if (!newName || !newPrice) {
        alert("Both fields must be filled!");
        return;
    }

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: newName,
            price: parseInt(newPrice),
            category: "Business",
            in_stock: true
        })
    })
        .then(response => response.json())
        .then(() => fetchLaptops())
        .catch(error => console.error('Error updating laptop:', error));
}
