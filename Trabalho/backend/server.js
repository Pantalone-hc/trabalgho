const express = require('express');
const cors = require('cors');
const cardsRouter = require('./routes/cardsRouter');
const systemRouter = require('./routes/systemRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} em ${req.url}`);
    next();
});

app.use('/api/cards', cardsRouter);
app.use('/api/system', systemRouter);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));