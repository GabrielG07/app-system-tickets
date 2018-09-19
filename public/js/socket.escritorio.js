// Comando para establecer la conexión
var socket = io();

var label = $('small');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(mensaje) {

        if (mensaje === 'No hay tickets') {
            label.text(mensaje);
            alert(mensaje);
            return;
        }

        label.text('Ticket ' + mensaje.numero);
    });
});