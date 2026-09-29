document.addEventListener('DOMContentLoaded', function() {
    
    const inputs = document.querySelectorAll('input[type="number"]');
    const botones = document.querySelectorAll('button');
    const btnEjecutar = botones[0];
    const btnLimpiar = botones[1];
    const divResultado = document.querySelector('.resultado');
    const pResultado = document.getElementById('resultado');
    const form = document.querySelector('form');

    function ejecutarOperaciones() {
        const valor1 = parseFloat(inputs[0].value);
        const valor2 = parseFloat(inputs[1].value);

        if (isNaN(valor1) || isNaN(valor2)) {
            alert('Por favor, ingrese ambos numeros.');
            return;
        }

        divResultado.classList.remove('oculto');

        let salida = '';

        for (let i = 1; i <= 5; i++) {
            let resultado;

            switch (i) {
                case 1:
                    resultado = valor1 + valor2;
                    salida += 'Iteracion ' + i + ' (Suma): ' + valor1 + ' + ' + valor2 + ' = ' + resultado + '<br>';
                    break;
                case 2:
                    resultado = valor1 - valor2;
                    salida += 'Iteracion ' + i + ' (Resta): ' + valor1 + ' - ' + valor2 + ' = ' + resultado + '<br>';
                    break;
                case 3:
                    resultado = valor1 * valor2;
                    salida += 'Iteracion ' + i + ' (Multiplicacion): ' + valor1 + ' x ' + valor2 + ' = ' + resultado + '<br>';
                    break;
                case 4:
                    if (valor2 === 0) {
                        salida += 'Iteracion ' + i + ' (Division): No se puede dividir entre cero.<br>';
                    } else {
                        resultado = valor1 / valor2;
                        salida += 'Iteracion ' + i + ' (Division): ' + valor1 + ' / ' + valor2 + ' = ' + resultado + '<br>';
                    }
                    break;
                case 5:
                    if (valor2 === 0) {
                        salida += 'Iteracion ' + i + ' (Modulo): No se puede calcular el modulo con cero.<br>';
                    } else {
                        resultado = valor1 % valor2;
                        salida += 'Iteracion ' + i + ' (Modulo): ' + valor1 + ' % ' + valor2 + ' = ' + resultado + '<br>';
                    }
                    break;
            }
        }

        pResultado.innerHTML = salida;
    }

    function limpiar() {
        inputs[0].value = '';
        inputs[1].value = '';
        pResultado.innerHTML = '';
        divResultado.classList.add('oculto');
        inputs[0].focus();
    }

    btnEjecutar.addEventListener('click', function(e) {
        e.preventDefault();
        ejecutarOperaciones();
    });

    btnLimpiar.addEventListener('click', function(e) {
        e.preventDefault();
        limpiar();
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        ejecutarOperaciones();
    });
});