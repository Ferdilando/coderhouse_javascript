// Array vacia la cual luego se ira completando con los nuevos empleados que creemos.
var empleados = [];

// clase persona, que tomara los datos de los nuevos empleados
class persona {
    constructor(nombre, apellido, dni, vHora, cHoras) {
        this.nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        this.apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);
        this.dni = dni;
        this.vHora = parseFloat(vHora);
        this.cHoras = parseFloat(cHoras);
    }
};

// funcion que permite cargar datos de los empleados, imprimirlos sobre el HTML y los agrega al array 'empleados'
function addEmployee() {
    var nombre = document.getElementById("fname").value;
    var apellido = document.getElementById("lname").value;
    var dni = document.getElementById("dni").value;

    // se valida que no falte ningun dato
    if (!nombre || !apellido || !dni) {
        Swal.fire({
            icon: 'error',
            title: 'Faltan datos',
            text: 'Por favor complete todos los campos',
        });
    } else {

        // se insertan los datos del input en la tabla
        var table = document.getElementsByName("tablapersona")[0];
        var newRow = table.insertRow(1);

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);

        cell1.innerHTML = nombre;
        cell2.innerHTML = apellido;
        cell3.innerHTML = dni;

        var datosLocalStorage = localStorage.getItem('empleados');
        if (datosLocalStorage !== null) {
            empleados = JSON.parse(datosLocalStorage);
        }
        empleados.push(new persona(nombre, apellido, dni))
        localStorage.setItem('empleados', JSON.stringify(empleados));
    }
}

// Funcion para agregar el valor hora de algun empleado
function valorHora() {
    var dni = document.getElementById("valorHora").value;

    // se traen los datos del empleado almacenados en el localstorage
    var empleados = JSON.parse(localStorage.getItem("empleados"));
    if (!empleados) {
        empleados = [];
    }
    var dnis = empleados.map(function (c) {
        return c.dni;
    });
    var persona = dnis.indexOf(dni);

    // Como en el caso de que el valor para indexOf sea nulo, trae como respuesta -1, se ejecuta el if solo si la respuesta es distinta a -1
    if (persona !== -1) {
        Swal.fire({
            title: "Ingrese el valor de la hora de este empleado:",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value || isNaN(value)) {
                    return "Ingrese un valor válido";
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                empleados[persona].vHora = result.value;
                localStorage.setItem("empleados", JSON.stringify(empleados));
                Swal.fire("Se actualizaron los datos del empleado");
            }
        });
    } else {
        Swal.fire("No existe un empleado con ese dni!");
    }
}

// Funcion para agregar cantidad de horas trabajadas de algun empleado
function cantidadHoras() {
    var dni = document.getElementById("valorHora").value;
    
    // se traen los datos del empleado almacenados en el localstorage
    var empleados = JSON.parse(localStorage.getItem("empleados"));
    if (!empleados) {
        empleados = [];
    }
    var dnis = empleados.map(function (c) {
        return c.dni;
    });
    var persona = dnis.indexOf(dni);

    // Como en el caso de que el valor para indexOf sea nulo, trae como respuesta -1, se ejecuta el if solo si la respuesta es distinta a -1
    if (persona !== -1) {
        Swal.fire({
            title: "Ingrese el valor de la hora de este empleado:",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value || isNaN(value)) {
                    return "Ingrese un valor válido";
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                empleados[persona].cHoras = result.value;
                localStorage.setItem("empleados", JSON.stringify(empleados));
                Swal.fire("Se actualizaron los datos del empleado");
            }
        });
    } else {
        Swal.fire("No existe un empleado con ese dni!");
    }
}

// Funcion para liquidar sueldo
function liquidarSueldo() {

    // se obtiene el dni de la persona a la que se le quiere liquidar el sueldo
    var dni = document.getElementById("liquidarSueldo").value

    // se busca dentro del array al objeto que coincide con el valor ingresado
    var empleados = JSON.parse(localStorage.getItem("empleados"));
    var persona = empleados.find(item => item.dni === dni);

    // se calculan los items dentro del bono de sueldo
    var sueldoBruto = persona.vHora * persona.cHoras
    var calcularDescuentos = (persona.vHora * persona.cHoras) * 0.17
    var descuentos = calcularDescuentos.toFixed(2)
    var calcularSueldoNeto = (persona.vHora * persona.cHoras) * 0.83
    var sueldoNeto = calcularSueldoNeto.toFixed(2)

    // se guardan los valores
    const liquidacion = { dni, sueldoBruto, descuentos, sueldoNeto }
    const enJson = JSON.stringify(liquidacion)

    localStorage.setItem("liquidacion", enJson)
}

// funcion para imprimir la liquidacion en pantalla
function verLiquidacion() {
    var employee = JSON.parse(localStorage.getItem('liquidacion'))

    // se traen los elementos guardados
    var dni = employee.dni
    var sueldoBruto = employee.sueldoBruto
    var descuentos = employee.descuentos
    var sueldoNeto = employee.sueldoNeto

    // se insertan los datos obtenidos dentro de la tabla
    var table = document.getElementsByName("tablaliquidacion")[0];
    var newRow = table.insertRow(1);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    cell1.innerHTML = dni;
    cell2.innerHTML = "$ " + sueldoBruto;
    cell3.innerHTML = "$ " + descuentos;
    cell4.innerHTML = "$ " + sueldoNeto;
}

// Función async en la que hace un fetch a una api que crea usuarios aleatorios, de tal forma que funcionen como supuesta nomina de la empresa
// Esta agrega 10 usuarios al array de empleados

// se define la variable empleadosCargados como falsa, de tal forma de que el llamado a la API se realice solo una vez
let empleadosCargados = false;

async function mostrarDatos() {
    let empleados = [];
    let empleadosCargados = localStorage.getItem('empleadosCargados') === 'true';

    // se ejecuta el if solo si aun no se ha realizado la llamada a la API
    if (!empleadosCargados) {
        const peticiones = [];

        // se trae la lista de empleados para que al agregar nuevos no se sobreescriban los ya existentes
        var datosLocalStorage = localStorage.getItem('empleados');
        if (datosLocalStorage !== null) {
            empleados = JSON.parse(datosLocalStorage);
        }
        for (let i = 0; i < 10; i++) {
            peticiones.push(fetch('https://randomuser.me/api/?nat=us'));
        }

        const respuestas = await Promise.all(peticiones);
        const datos = await Promise.all(respuestas.map(respuesta => respuesta.json()));

        datos.forEach(data => {
            const user = data.results[0];
            const nombre = user.name.first;
            const apellido = user.name.last;
            const dni = user.id.value;
            const userData = { nombre, apellido, dni };
            empleados.push(userData);
        });

        localStorage.setItem('empleados', JSON.stringify(empleados));

        // se guarda empleadosCargados en el local storage como True, de tal forma que no se vuelva a realizar la llamada a la API más de una vez
        localStorage.setItem('empleadosCargados', true);
    } else {
        empleados = JSON.parse(localStorage.getItem('empleados'));
    }

    var mensaje = 'Empleados en la base de datos: ' + "<br>" + "<br>";
    for (var i = 0; i < empleados.length; i++) {
        mensaje += empleados[i].nombre + " " + empleados[i].apellido + " " + empleados[i].dni + "<br>";
    }

    Swal.fire({
        html: mensaje,
        icon: 'info',
        title: 'Lista de empleados',
    });
}




