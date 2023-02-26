const express = require('express');
const ledgerRoutes = require('./routes/ledgerRoutes');

const app = express();

// Use JSON middleware
app.use(express.json());

// Use ledger routes
app.use('/api', ledgerRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});