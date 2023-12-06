
const productosContainer = document.getElementById('productos');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');
let carrito = [];


const productos = [
	{ nombre: "Remera Git Hub", imagen: "img/remera1.jpg", precio: 15000 },
	{ nombre: "Remera SASS", imagen: "img/remera2.jpg", precio: 15000 },
	{ nombre: "Remera AngularJs", imagen: "img/remera3.jpg", precio: 15000 },
	{ nombre: "Remera NodeJs", imagen: "img/remera4.jpg", precio: 15000 },
	{ nombre: "Remera Html", imagen: "img/remera5.jpg", precio: 17500 },
	{ nombre: "Remera JS", imagen: "img/remera6.jpg", precio: 21000 }
];


function agregarAlCarrito(nombre, precio) {
    
	carrito.push({ nombre, precio});
	actualizarListaCarrito();
    mostrarModal();
    guardarCarritoLocalStorage();
}
function guardarCarritoLocalStorage(){
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("Carrito guardado en localStorage:", carrito);
    
}

function mostrarModal() {
    const modalElement = document.getElementById('carritoModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();

}

function actualizarListaCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = ''; 
    carrito.map((producto, index) => {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        item.innerHTML = `
        ${producto.nombre} - Valor: ${producto.precio}
        <span class="fas fa-trash-alt float-right" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})"></span>
        `;
        listaCarrito.appendChild(item);
});
    calcularTotal();

}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1); 
    actualizarListaCarrito(); 
    localStorage.clear();
}
function calcularTotal() {
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    totalCarrito.textContent = `Total: $ ${total}`;
}

function mostrarProductosFiltrados(productosFiltrados) {
    productosContainer.innerHTML = ""; 
    productosFiltrados.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.innerHTML = `
            <div class="producto">
                <h4>${producto.nombre}</h4>
                <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}">
                <p>Valor: ${producto.precio}</p>
                <button class="btn btn-primary" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
            </div>
        `;
        productosContainer.appendChild(divProducto);
    });
}
function filtrarProductos() {
	
    const textoBusqueda = document.getElementById("buscador").value.toLowerCase();
    const productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(textoBusqueda)
    );
    mostrarProductosFiltrados(productosFiltrados);
}
document.getElementById("buscador").addEventListener("input", filtrarProductos);