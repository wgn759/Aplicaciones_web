document.addEventListener("DOMContentLoaded", () => {

    const form         = document.getElementById("formCliente");
    const cedula       = document.getElementById("cedula");
    const nombre       = document.getElementById("nombre");
    const direccion    = document.getElementById("direccion");
    const telefono     = document.getElementById("telefono");
    const correo       = document.getElementById("correo");
    const mensajeExito = document.getElementById("mensajeExito");
    const btnLimpiar   = document.getElementById("btnLimpiar");

    /* ------------------------------------------------------------
       FUNCIONES AUXILIARES
    ------------------------------------------------------------ */
    function mostrarError(input, span, mensaje) {
        input.classList.add("invalido");
        input.classList.remove("valido");
        span.textContent = mensaje;
    }

    function mostrarValido(input, span) {
        input.classList.add("valido");
        input.classList.remove("invalido");
        span.textContent = "";
    }

    /* ------------------------------------------------------------
       VALIDACIONES INDIVIDUALES
    ------------------------------------------------------------ */

    // Cédula: exactamente 10 dígitos numéricos
    function validarCedula() {
        const valor = cedula.value.trim();
        const span  = document.getElementById("errorCedula");
        const regex = /^[0-9]{10}$/;

        if (valor === "") {
            mostrarError(cedula, span, "La cédula es obligatoria.");
            return false;
        }
        if (!regex.test(valor)) {
            mostrarError(cedula, span, "La cédula debe tener 10 dígitos numéricos.");
            return false;
        }
        mostrarValido(cedula, span);
        return true;
    }

    // Nombre: solo letras y espacios, máx 30 caracteres, mín 3
    function validarNombre() {
        const valor = nombre.value.trim();
        const span  = document.getElementById("errorNombre");
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;

        if (valor === "") {
            mostrarError(nombre, span, "El nombre es obligatorio.");
            return false;
        }
        if (valor.length < 3) {
            mostrarError(nombre, span, "El nombre debe tener al menos 3 caracteres.");
            return false;
        }
        if (valor.length > 30) {
            mostrarError(nombre, span, "El nombre no puede superar 30 caracteres.");
            return false;
        }
        if (!regex.test(valor)) {
            mostrarError(nombre, span, "El nombre solo puede contener letras y espacios.");
            return false;
        }
        mostrarValido(nombre, span);
        return true;
    }

    // Dirección: máx 50 caracteres, mín 5
    function validarDireccion() {
        const valor = direccion.value.trim();
        const span  = document.getElementById("errorDireccion");

        if (valor === "") {
            mostrarError(direccion, span, "La dirección es obligatoria.");
            return false;
        }
        if (valor.length < 5) {
            mostrarError(direccion, span, "La dirección debe tener al menos 5 caracteres.");
            return false;
        }
        if (valor.length > 50) {
            mostrarError(direccion, span, "La dirección no puede superar 50 caracteres.");
            return false;
        }
        mostrarValido(direccion, span);
        return true;
    }

    // Teléfono: exactamente 10 dígitos numéricos
    function validarTelefono() {
        const valor = telefono.value.trim();
        const span  = document.getElementById("errorTelefono");
        const regex = /^[0-9]{10}$/;

        if (valor === "") {
            mostrarError(telefono, span, "El teléfono celular es obligatorio.");
            return false;
        }
        if (!regex.test(valor)) {
            mostrarError(telefono, span, "El teléfono debe tener 10 dígitos numéricos.");
            return false;
        }
        mostrarValido(telefono, span);
        return true;
    }

    // Correo: formato válido usuario@dominio.ext
    function validarCorreo() {
        const valor = correo.value.trim();
        const span  = document.getElementById("errorCorreo");
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (valor === "") {
            mostrarError(correo, span, "El correo electrónico es obligatorio.");
            return false;
        }
        if (!regex.test(valor)) {
            mostrarError(correo, span, "Ingrese un correo electrónico válido (ej: usuario@dominio.com).");
            return false;
        }
        mostrarValido(correo, span);
        return true;
    }

    /* ------------------------------------------------------------
       EVENTOS BLUR (validación al salir del campo)
    ------------------------------------------------------------ */
    cedula.addEventListener("blur", validarCedula);
    nombre.addEventListener("blur", validarNombre);
    direccion.addEventListener("blur", validarDireccion);
    telefono.addEventListener("blur", validarTelefono);
    correo.addEventListener("blur", validarCorreo);

    /* ------------------------------------------------------------
       RESTRICCIONES EN TIEMPO REAL
       - Solo números para cédula y teléfono
    ------------------------------------------------------------ */
    [cedula, telefono].forEach(input => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/[^0-9]/g, "");
        });
    });

    /* ------------------------------------------------------------
       ENVÍO DEL FORMULARIO
    ------------------------------------------------------------ */
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const v1 = validarCedula();
        const v2 = validarNombre();
        const v3 = validarDireccion();
        const v4 = validarTelefono();
        const v5 = validarCorreo();

        if (v1 && v2 && v3 && v4 && v5) {
            mensajeExito.textContent = "✅ ¡Cliente registrado correctamente!";
            mensajeExito.classList.remove("oculto");

            // Mostrar datos en consola (simula envío)
            console.log("=== DATOS DEL CLIENTE ===");
            console.log("Cédula:    ", cedula.value);
            console.log("Nombre:    ", nombre.value);
            console.log("Dirección: ", direccion.value);
            console.log("Teléfono:  ", telefono.value);
            console.log("Correo:    ", correo.value);

            setTimeout(() => form.reset(), 1200);

            // Limpiar estilos de validación
            document.querySelectorAll("input").forEach(inp => {
                inp.classList.remove("valido", "invalido");
            });
        } else {
            mensajeExito.classList.add("oculto");
        }
    });

    /* boton de limpiar */
    btnLimpiar.addEventListener("click", () => {
        mensajeExito.classList.add("oculto");
        document.querySelectorAll("input").forEach(inp => {
            inp.classList.remove("valido", "invalido");
        });
        document.querySelectorAll(".error").forEach(span => {
            span.textContent = "";
        });
    });
});