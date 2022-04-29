const typed = new Typed(`.typed`,{
    strings: ["Bienvenido a MyPacient","Bienvenido a MyPacient.","Bienvenido a MyPacient..","Bienvenido a MyPacient..."],
    stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
	typeSpeed: 50, // Velocidad en mlisegundos para poner una letra,
	startDelay: 100, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,

	cursorChar: '|', // Caracter para el cursor
	contentType: 'html', // 'html' o 'null' para texto sin formato
});

