const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const loggerSistema = (req, res, next) => {
    console.log(`[LOG SISTEMA]: Operação crítica em ${req.originalUrl}`);
    next();
};
router.use(loggerSistema);

router.delete('/delete-file', async (req, res) => {
    const tempFilePath = path.join(__dirname, '../data/temp.json');
    
    try {
        await fs.access(tempFilePath); 
        
        await fs.unlink(tempFilePath);
        res.status(200).json({ message: 'Arquivo deletado com sucesso!' });
        
    } catch (err) {
        res.status(404).json({ error: 'O arquivo temp.json já não existe mais.' });
    }
});

module.exports = router;