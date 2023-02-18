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

// funcion que permite cargar datos de los empleados y los agrega al array 'empleados'
function cargar() {

    // Se traen la cantidad de empleados que se quieran cargar al hacer click en el boton cargar
    var itemsACargar = document.getElementById("carga").value;
    var i

    // se recorre la cantidad de empleados que se selecciono cargar
    for (i = 1; i <= itemsACargar; i++) {

        // se pide nombre, apellido y dni de la persona. No permite valores vacios ni que el dni contenga valores no numericos
        nombre = prompt("Ingrese el nombre de la persona " + i)
        while (nombre === "") {
            alert("Ingrese un valor válido")
            nombre = prompt("Ingrese el nombre de la persona " + i)
        }
        if (nombre === null) {
            break
        }
        apellido = prompt("Ingrese el apellido de la persona " + i)
        while (apellido === "") {
            alert("Ingrese un valor válido")
            apellido = prompt("Ingrese el apellido de la persona " + i)
        }
        if (apellido === null) {
            break
        }
        dni = prompt("Ingrese el DNI de la persona " + i)
        while (dni === "" || isNaN(dni)) {
            alert("Ingrese un valor válido")
            dni = prompt("Ingrese el dni de la persona " + i)
        }
        if (dni === null) {
            break
        }

        // Se muestra los datos que se cargaron para corroborar
        alert("Se ingresaron los datos del empleado " + i + ":" + " \n Nombre: " + nombre + " \n Apellido: " + apellido + " \n DNI: " + dni)

        // se pushea el nuevo objeto dentro del array vacio que habiamos creado
        empleados.push(new persona(nombre, apellido, dni))

    }
}
// Funcion para agregar el valor hora de algun empleado
function valorHora() {
    // se obtiene el dni de la persona a la que se le quiere cargar el valor hora al hacer click en el boton
    var valor = document.getElementById("valorHora").value
    // se mapea el array y se busca el objeto que coincida con el dni cargado
    var dnis = empleados.map(function (c) { return c.dni })
    var persona = dnis.indexOf(valor)

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
    var valor = document.getElementById("cantidadHoras").value
    // se mapea el array y se busca el objeto que coincida con el dni cargado
    var dnis = empleados.map(function (c) { return c.dni })
    var cHoras = dnis.indexOf(valor)

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
    var valor = document.getElementById("liquidarSueldo").value
    // se busca dentro del array al objeto que coincide con el valor ingresado
    var persona = empleados.find(item => item.dni === valor);
    // se calculan los items dentro del bono de sueldo
    var sueldoBruto = persona.vHora * persona.cHoras
    var descuentos = (persona.vHora * persona.cHoras) * 0.17
    var sueldoNeto = (persona.vHora * persona.cHoras) * 0.83

    // se muestra el resultado de la liquidacion
    alert("La liquidación de " + persona.nombre + " " + persona.apellido + " es:" + "\n Sueldo Bruto: $" + sueldoBruto + "\n Descuentos: $" + descuentos + "\n Sueldo Neto: $" + sueldoNeto)

}

