const express = require('express');
const listRouter = require('./src/controller/list-controller.js');
const cors = require('cors');

const app = express();
const port = 3030; // port na kterém bude server běžet

// Middleware for simulating delay
app.use((req, res, next) => {
  setTimeout(next, 1000);
});

app.use(cors()); // povolí CORS pro všechny domény
app.use('/api', listRouter); // použije list router

app.use((err, req, res, next) => { // middleware pro zachycení chyb
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => { // server běží na portu 3030
  console.log(`Server is running on port ${port}`);
});