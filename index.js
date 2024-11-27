require('dotenv').config();
const express = require('express');
const catalogRoutes = require('./src/routes/catalog');

const app = express();
app.use(express.json());

// Rutas
app.use('/api/catalog', catalogRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`Catalog service running on port ${PORT}`);
});
