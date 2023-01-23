const express = require('express');
const app = express();
const PORT = 8080;

app.get(`/`, (req,res) => {
    res.send(`Server Online localhost:${PORT} - <b>pid ${process.pid}</b> - ${new Date().toLocaleString()}`);
});
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT}`);
});
server.on(`error`, error => console.log(`Error del servidor ${error}`));