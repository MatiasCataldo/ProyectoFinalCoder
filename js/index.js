// Muestra u oculta el botón dependiendo de la posición de desplazamiento
window.onscroll = function() {
    scrollFunction();
    };
    function scrollFunction() {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
    }
    
    function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    }
    
    const productosEnCarrito = document.querySelector('span#productosEnCarrito')
    const container = document.querySelector('div#container.container')
    const inputSearch = document.querySelector('input#inputSearch')
    
    function mostrarTotalProdsEnCarrito() {
        productosEnCarrito.textContent = bicicletas.length
    }
    
    bicicletas.length > 0 && mostrarTotalProdsEnCarrito()
    
    function retornarCardError() {
        return `<div class="card-error">
                    <h2>ERORR 404!</h2>
                    <h3>Vuelve a intentar en unos minutos...</h3>
                    <h4>⏳</h4>
                </div>`
    }

    function retornarCardHTML({ imagen, codigo, nombre, precio, descipsion } = producto) {
        return `<div class="div-card">
                    <div class="imagen">
                        <img src="${imagen}" alt="${nombre}">
                    </div>
                    <div class="prenda">
                        <p>${nombre}</p> 
                    </div>
                    <div class="importe">
                        <p>$ ${precio.toLocaleString()}</p>
                    </div>
                    <div class="descipsion">
                        <p> ${descipsion}</p>
                    </div>
                    <div class="comprar">
                        <button class="button button-outline button-add" id="${codigo}">ADD
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>`;
    }
    
    function activarClickEnBotones() {
        const botones = document.querySelectorAll('button.button.button-outline.button-add')
        botones.forEach((boton)=> {
            boton.addEventListener('click', ()=> {
                let producto = bicicletas.find((bicicleta)=> bicicleta.codigo === parseInt(boton.id))
                carrito.push(producto)
                localStorage.setItem('Carrito', JSON.stringify(carrito))
                mostrarTotalProdsEnCarrito()
                Swal.fire({
                    title: `Producto agregado: ${producto.nombre}`,
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 2500,
                })
            })
        })
    }
    
    function cargarProductos(arrayBicicletas) {
        container.innerHTML = ""
        arrayBicicletas.forEach((bicicleta)=> container.innerHTML += retornarCardHTML(bicicleta) )
        activarClickEnBotones()
    }
    
    bicicletas.length > 0 ? cargarProductos(bicicletas) : container.innerHTML = retornarCardError()
    
    inputSearch.addEventListener('search', ()=> {
        localStorage.setItem("ultimaBusqueda", inputSearch.value)
        const resultado = bicicletas.filter((bicicleta)=> bicicleta.nombre.toLowerCase().includes(inputSearch.value.toLowerCase()))
        cargarProductos(resultado)
    })
    