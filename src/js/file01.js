"use strict";
const showToast = () => {
    const toastLiveExample = document.getElementById("toast-interactive");
    if (toastLiveExample) {
        toastLiveExample.classList.remove("hidden");
        setTimeout(() => {
            toastLiveExample.classList.add("hidden");
        }, 3000);
    }
};
const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

(() => {
    showToast();
    showVideo();
})();

// IIFE (Immediately Invoked Function Expression) que muestra un mensaje de bienvenida
(function welcomeIIFE() {
	const message = '¡Bienvenido! Gracias por visitar nuestra página.';
	// Mostrar alerta (si está disponible) y registrar en la consola
	try {
		if (typeof window !== 'undefined' && typeof window.alert === 'function') {
			window.alert(message);
		}
	} catch (e) {
		// En ambientes sin window (por ejemplo, algunos tests), ignorar el alert
	}
	console.log(message);
})();

