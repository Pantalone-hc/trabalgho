const API_URL = 'http://localhost:3000/api/cards';

async function carregarCartas() {
    const response = await fetch(API_URL);
    const cards = await response.json();
    
    const list = document.getElementById('cardList');
    list.innerHTML = '';
    
    cards.forEach(card => {
        const li = document.createElement('li');
        li.textContent = `${card.name} `;
        
        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Editar (PUT)';
        btnEdit.onclick = () => editarCarta(card.id);

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Excluir (DELETE)';
        btnDelete.onclick = () => deletarCarta(card.id);
        
        li.appendChild(btnEdit);
        li.appendChild(btnDelete);
        list.appendChild(li);
    });
}

document.getElementById('cardForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    
    document.getElementById('name').value = '';
    carregarCartas();
});

async function editarCarta(id) {
    const novoNome = prompt("Digite o novo nome da carta:");
    if (!novoNome) return;

    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: novoNome })
    });
    carregarCartas();
}

async function deletarCarta(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    carregarCartas();
}

async function deletarArquivoFisico() {
    const response = await fetch('http://localhost:3000/api/system/delete-file', {
        method: 'DELETE'
    });
    const result = await response.json();
    alert(result.message || result.error);
}

carregarCartas();