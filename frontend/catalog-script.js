const apiUrl = 'http://localhost:3000/laptops';

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
                    <h3>${laptop.brand} - ${laptop.model}</h3>
                    <p>Price: $${laptop.price}</p>
                    <button onclick="updateLaptop('${laptop._id}')">Edit</button>
                    <button onclick="deleteLaptop('${laptop._id}')">Delete</button>
                `;
                laptopList.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching laptops:', error));
}

function addLaptop() {
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const price = document.getElementById('price').value;

    if (!brand || !model || !price) {
        alert("Fill in all fields!");
        return;
    }

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand, model, price })
    }).then(response => response.json())
        .then(() => {
            fetchLaptops();
            document.getElementById('brand').value = '';
            document.getElementById('model').value = '';
            document.getElementById('price').value = '';
        })
        .catch(error => console.error('Error adding laptop:', error));
}

function deleteLaptop(id) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(() => fetchLaptops())
        .catch(error => console.error('Error deleting laptop:', error));
}

function updateLaptop(id) {
    const brand = prompt('Enter new brand:');
    const model = prompt('Enter new model:');
    const price = prompt('Enter new price:');

    if (!brand || !model || !price) {
        alert("Fill in all fields!");
        return;
    }

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand, model, price })
    }).then(() => fetchLaptops())
        .catch(error => console.error('Error updating laptop:', error));
}
