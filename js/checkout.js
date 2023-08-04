const tableBody = document.querySelector('tbody')
const sectionProductos = document.querySelector('section')

function mostrarMsgCarritoVacio() {
    return `<div class="card-error">
                <h3>El carrito está vacío</h3>
                <h4>🛒</h4>
            </div>`
}

function armarCarrito() {
    tableBody.innerHTML = ''
    carrito.length > 0 ? carrito.forEach((bicicleta) => tableBody.innerHTML += listarProductosEnCarritoHTML(bicicleta))
        : sectionProductos.innerHTML = mostrarMsgCarritoVacio()
}

function eliminarProducto(codigo) {
    const index = carrito.findIndex((producto) => producto.codigo === codigo);
    if (index !== -1) {
        carrito.splice(index, 1);
        localStorage.setItem('Carrito', JSON.stringify(carrito));
        armarCarrito();
        mostrarPrecioTotal(carrito);
    }
}

function listarProductosEnCarritoHTML(bicicleta) {
    return `<tr>
            <td>${bicicleta.codigo}</td>
            <td>${bicicleta.nombre}</td>
            <td>$ ${bicicleta.precio.toLocaleString()}</td>
            <td><button class="btn-quitar" data-codigo="${bicicleta.codigo}">❌</button></td>
        </tr>`;
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-quitar')) {
        const codigoProducto = parseInt(event.target.dataset.codigo);
        eliminarProducto(codigoProducto);
        Toastify({
            text: `Producto Eliminado❌`,
            duration: 1500,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "rgba(236, 3, 3, 0.945)",
            },
            onClick: function(){} // Callback after click
            }).showToast();
    }
});

function calcularPrecioTotal() {
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio;
    });
    return total;
}

function mostrarPrecioTotal(carrito) {
    if (carrito.length !== 0) {
        const precioTotal = calcularPrecioTotal();
        const precioTotalElement = document.getElementById('precioTotal');
        precioTotalElement.textContent = `$ ${precioTotal.toLocaleString()}`;
    }
}

function vaciarCarrito() {
    localStorage.removeItem('Carrito');
    carrito.length = 0;
    armarCarrito();
    mostrarPrecioTotal(carrito);
}

function startProgress() {
    const button = document.getElementById('btnComprar');
    if (button.classList.contains('disabled')) {
        // Si el botón está desactivado, no hacer nada
        return;
    }
    const progressBar = document.createElement('BotonCarga');
    progressBar.classList.add('progressBar');
    button.appendChild(progressBar);
    let width = 0;
    const interval = setInterval(frame, 50);
    function frame() {
        if (width >= 100) {
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                text: 'Gracias por tu compra!',
                timer: 2500
            });
            vaciarCarrito();
            clearInterval(interval);
            button.classList.remove('disabled');
            progressBar.remove();
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }
    button.classList.add('disabled');
}

armarCarrito()
mostrarPrecioTotal(carrito);