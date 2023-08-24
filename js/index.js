const contenedorTarjetas = document.getElementById("productos-container");

// Crea las tarjetas de productos teniendo en cuenta la lista en bicicletas.js 
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevaBicicleta = document.createElement("div");
    nuevaBicicleta.classList = "tarjeta-producto";
    nuevaBicicleta.innerHTML = `
      <img src="./img/productos/${producto.id}.jpg" alt="Bicicleta 1">
      <h3>${producto.nombre}</h3>
      <p class="precio">$${producto.precio}</p>
      <button class="btn-agregar">Agregar al carrito</button>`;
    contenedorTarjetas.appendChild(nuevaBicicleta);

    const botonAgregar = nuevaBicicleta.querySelector(".btn-agregar");
    botonAgregar.addEventListener("click", async () => {
      await delay(1500);
    
      agregarAlCarrito(producto);
      mostrarAlert();
    });
    
    async function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  });
}

function mostrarAlert() {
  Swal.fire({
    title: 'Carrito',
    text: 'Producto añadido al carrito.',
    icon: 'success',
    showConfirmButton: false,
    timer: 1500 
  });
}

crearTarjetasProductosInicio(bicicletas);



document.getElementById("filtrarButton").addEventListener("click", async function() {
  await delay(1500);

  const precioMinimo = parseFloat(document.getElementById("precioMinimo").value);
  const precioMaximo = parseFloat(document.getElementById("precioMaximo").value);

  const tarjetasProductos = document.getElementsByClassName("tarjeta-producto");

  for (let i = 0; i < tarjetasProductos.length; i++) {
    const tarjeta = tarjetasProductos[i];
    const precioProducto = parseFloat(tarjeta.querySelector(".precio").textContent.replace("$", ""));

    if (precioProducto >= precioMinimo && precioProducto <= precioMaximo) {
      tarjeta.style.display = "block";
    } else {
      tarjeta.style.display = "none";
    }
  }
});

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}