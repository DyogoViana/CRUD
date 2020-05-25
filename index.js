const express = require('express');

const server = express();

const users = ['Paciente 001', 'Paciente 002', 'Paciente 003'];

server.get('/users/:index', (request, response) => {
    const { index } = request.params;

    return response.json(users[index]);
});

server.listen(3000);