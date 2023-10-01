const socket = io();
let user;
const inputMSJ = document.getElementById('msj');

Swal.fire({
	title: 'Bienvenido',
	input: 'text',
	text: 'Ingresa tu nickname',
	icon: 'success',
	inputValidator: (value) => {
		return !value && '¡Tenes que identificarte para poder participar del chat!';
	},
	allowOutsideClick: false,
}).then((result) => {
	user = result.value;
	socket.emit('login', user);
});

function render(data) {
	// Genero el html
	const html = data
		.map((elem, index) => {
			// Recorro el array de mensajes y genero el html
			return `<div>
				<strong>${elem.user}:</strong>
                <em>${elem.msj}</em>
            </div>`;
		})
		.join(' '); // Convierto el array de strings en un string

	// Inserto el html en el elemento con id messages
	document.getElementById('messages').innerHTML = html;
}

inputMSJ.addEventListener('keyup', (event) => {
	if (event.key === 'Enter') {
		let msj = inputMSJ.value;
		if (msj.trim().length > 0) {
			socket.emit('messageClient', { user, msj });
			inputMSJ.value = '';
		}
	}
});

socket.on('messages', (data) => {
	render(data);
});

socket.on('connected', (data) => {
	Swal.fire({
		text: `Se conecto ${data}`,
		toast: true,
		position: 'top-right',
	});
});
