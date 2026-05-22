const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', async (req, res) => {
    const filePath = path.join(__dirname, '../data/accessories.json');
    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.status(200).json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: 'Erro ao ler acessórios' });
    }
});
module.exports = router;