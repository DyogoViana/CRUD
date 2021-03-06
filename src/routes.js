import { Router } from 'express';

const routes = Router();

routes.use(routes.json());

const users = ['Paciente 001', 'Paciente 002', 'Paciente 003'];

// Middlewares
function checarUsuarioExiste(request, response, next) {
	if (!request.body.name) {
		return response.status(400).json({
			error: 'Nome do paciente é obrigatório.',
		});
	}
	return next();
}

function checarArrayUsuario(request, response, next) {
	const user = users[request.params.index];

	if (!user) {
		return response.status(400).json({
			error: 'Paciente não existe.',
		});
	}
	request.user = user;

	return next();
}

// GET
routes.get('/users', (request, response) => response.json(users));

routes.get('/users/:index', checarArrayUsuario, (request, response) =>
	response.json(request.user)
);

// POST
routes.post('/users', checarUsuarioExiste, (request, response) => {
	const { name } = request.body;

	users.push(name);

	return response.json(users);
});

// PUT
routes.put(
	'/users/:index',
	checarArrayUsuario,
	checarUsuarioExiste,
	(request, response) => {
		const { index } = request.params;
		const { name } = request.body;

		users[index] = name;

		return response.json(users);
	}
);

// DELETE
routes.delete('/users/:index', checarArrayUsuario, (request, response) => {
	const { index } = request.params;
	users.splice(index, 1);
	return response.send();
});

export default routes;
