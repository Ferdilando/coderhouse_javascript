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
        alert("Faltan datos")
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

        // se pushea el nuevo objeto dentro del array vacio que habiamos creado
        empleados.push(new persona(nombre, apellido, dni))
    }
}


// Funcion para agregar el valor hora de algun empleado
function valorHora() {
    // se obtiene el dni de la persona a la que se le quiere cargar el valor hora al hacer click en el boton
    var dni = document.getElementById("valorHora").value
    // se mapea el array y se busca el objeto que coincida con el dni cargado
    var dnis = empleados.map(function (c) { return c.dni })
    var persona = dnis.indexOf(dni)

    // como el metodo indexOf trae como valor -1 en caso de que no encuentre el valor dentro del array, se crea un if para que solo se cargue la info en caso de haber coincidencia
    if (persona !== -1) {
        empleados[persona].vHora = prompt("Ingrese el valor de la hora de este empleado")
        while (empleados[persona].vHora === "" || isNaN(empleados[persona].vHora)) {
            alert("Ingrese un valor válido")
            //se le asigna el valor a vHora que se ingreso al prompt 
            empleados[persona].vHora = prompt("Ingrese el valor de la hora de este empleado")
        }
        if (empleados[persona].vHora === null) {
            return
        }
        else {
            alert("Se actualizaron los datos del empleado")
        }
    }
    else {
        alert("No existe un empleado con ese dni!")
    }
}
// Funcion para agregar cantidad de horas trabajadas de algun empleado
function cantidadHoras() {
    // se obtiene el dni de la persona a la que se le quiere cargar la cantidad de horas trabajadas al hacer click en el boton
    var dni = document.getElementById("valorHora").value
    // se mapea el array y se busca el objeto que coincida con el dni cargado
    var dnis = empleados.map(function (c) { return c.dni })
    var cHoras = dnis.indexOf(dni)

    // como el metodo indexOf trae como valor -1 en caso de que no encuentre el valor dentro del array, se crea un if para que solo se cargue la info en caso de haber coincidencia
    if (cHoras !== -1) {
        empleados[cHoras].cHoras = prompt("Ingrese la cantidad de horas trabajadas por este empleado")
        while (empleados[cHoras].cHoras === "" || isNaN(empleados[cHoras].cHoras)) {
            alert("Ingrese un valor válido")
            //se le asigna el valor a cHoras que se ingreso al prompt 
            empleados[cHoras].cHoras = prompt("Ingrese el valor de la hora de este empleado")
        }
        if (empleados[cHoras].cHoras === null) {
            return
        }
        else {
            alert("Se actualizaron los datos del empleado")
        }
    }
    else {
        alert("No existe un empleado con ese dni!")
    }
}

// Funcion para liquidar sueldo
function liquidarSueldo() {
    // se obtiene el dni de la persona a la que se le quiere liquidar el sueldo
    var dni = document.getElementById("liquidarSueldo").value
    // se busca dentro del array al objeto que coincide con el valor ingresado
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

    localStorage.setItem("empleado", enJson)
}

// funcion para imprimir la liquidacion en pantalla
function verLiquidacion() {
    var employee = JSON.parse(localStorage.getItem('empleado'))

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

