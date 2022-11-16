//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Agregar curso presionando "Agregar"
    listaCursos.addEventListener('click', agregarCurso); //O sea, con cada click ejecutaremos esa funcion (agregarCurso)
    // Eliminar curso presionando "X"
    carrito.addEventListener('click', eliminarCurso);

    //Mostrar los cursos almacenados en localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];
        CarritoHTML();
    })

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    })
}

function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Eliminar el curso del arreglo segun el id de X
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        // iteramos sobre el carrito y mostramos el HTML
        CarritoHTML();
    }
}

function leerDatosCurso(curso) {

    //Crear un objeto con los datos del curso clickeado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisamos si el curso ya existe en el array articuloCarrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    // Actualizamos la cantidad
    if(existe) {
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso; // Retorna el objeto con la cantidad actualizada
                console.log("Añadiendo similar.....");
            } else {
                return curso; // Retorna el objeto sin modificarlo
            }
        })
    }
    else {
        //Hacemos un arreglo de objetos
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    //Funcion para agregar el arrelgo al HTML del carrito.
    CarritoHTML();
}




function CarritoHTML(){
    //limpiaremos el HTML así no se repite
    limpiarHTML();

    //recorre el array y crea la etiqueta HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        //Modificamos el contenido interno
        row.innerHTML = `           
            <td> <img src="${imagen}" width="100"> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> <a href="#" class="borrar-curso" data-id="${id}"> X </td>
            `;

        //agregar al HTML dentro de tbody, como hijo
        contenedorCarrito.appendChild(row);
    });

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarHTML() {
    // contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}




