const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/cards.json');

async function readData() {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

router.get('/', async (req, res) => {
    try {
        const data = await readData();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Erro de I/O' });
    }
});

router.post('/', async (req, res) => {
    try {
        const cards = await readData();
        const newCard = { id: Date.now(), name: req.body.name };
        cards.push(newCard);
        await fs.writeFile(filePath, JSON.stringify(cards, null, 2)); // Edita o arquivo JSON
        res.status(201).json(newCard);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao salvar' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const cards = await readData();
        const index = cards.findIndex(c => c.id === parseInt(req.params.id));
        
        if (index === -1) return res.status(404).json({ error: 'Não encontrado' });
        
        cards[index].name = req.body.name;
        await fs.writeFile(filePath, JSON.stringify(cards, null, 2)); // Manipulação de arquivo
        res.status(200).json(cards[index]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let cards = await readData();
        cards = cards.filter(c => c.id !== parseInt(req.params.id));
        await fs.writeFile(filePath, JSON.stringify(cards, null, 2));
        res.status(200).json({ message: 'Deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar' });
    }
});

module.exports = router;