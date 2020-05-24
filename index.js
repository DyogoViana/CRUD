const express = require('express');

const server = express();

server.get('/teste', (request, response) => {
    return response.json({ message: 'White Rabb1t.' });
});

server.listen(3000);