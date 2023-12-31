const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage */
function crearTarjetasProductosCarrito() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("bicicletas"));
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevaBicicleta = document.createElement("div");
      nuevaBicicleta.classList = "tarjeta-producto";
      nuevaBicicleta.innerHTML = `
    <img src="./img/productos/${producto.id}.jpg" alt="Bicicleta 1">
    <h3>${producto.nombre}</h3>
    <span>$${producto.precio}</span>
    <div>
    <button>-</button>
    <span class="cantidad">${producto.cantidad}</span>
    <button>+</button>
    </div>
    `;
      contenedorTarjetas.appendChild(nuevaBicicleta);
      nuevaBicicleta
      .getElementsByTagName("button")[0]
      .addEventListener("click", async (e) => {
        const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
        cantidadElement.innerText = restarAlCarrito(producto);
        crearTarjetasProductosCarrito();
        await delay(1500);
        
        actualizarTotales();
      });
    
    nuevaBicicleta
      .getElementsByTagName("button")[1]
      .addEventListener("click", async (e) => {
        const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
        cantidadElement.innerText = agregarAlCarrito(producto);
        await delay(1500);
        
        actualizarTotales();
      });
    
    async function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    });
  }
  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("bicicletas"));
  let cantidad = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }
  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;
  if(precio === 0) {
    reiniciarCarrito();
    revisarMensajeVacio();
  }
}

const botonComprar = document.getElementById("comprar");

botonComprar.addEventListener("click", () => {
  setTimeout(() => {
    mostrarMensajeCompraExitosa();
  }, 2000);
});

function mostrarMensajeCompraExitosa() {
  Swal.fire({
    title: 'Compra exitosa',
    text: 'Gracias por tu compra. Tu pedido ha sido procesado.',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
}


document.getElementById("reiniciar").addEventListener("click", async () => {
  contenedorTarjetas.innerHTML = "";
  await delay(1500); 
  reiniciarCarrito();
  revisarMensajeVacio();
});

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("bicicletas"));
  carritoVacioElement.classList.toggle("escondido", productos);
  totalesContainer.classList.toggle("escondido", !productos);
}