const express = require('express');

const server = express();

server.use(express.json()); 

const users = ['Paciente 001', 'Paciente 002', 'Paciente 003'];


// GET
server.get('/users', (request, response) => {
    return response.json(users);
});

server.get('/users/:index', (request, response) => {
    const { index } = request.params;

    return response.json(users[index]);
});


// POST
server.post('/users', (request, response) => {
    const { name } = request.body;

    users.push(name);

    return response.json(users);
});


// PUT
server.put('/users/:index', (request, response) => {
    const { index } = request.params;
    const { name } = request.body;

    users[index] = name;

    return response.json(users);
});


// DELETE
server.delete('/users/:index', (request, response) => {
    const { index } = request.params;

    users.splice(index, 1);

    return response.send();
});

server.listen(3000);