const URL_JSON = 'data/productos.json';

$(() => {
    const agregarEventoClick = (array, prefijo) => {
        array.forEach((producto, i) => {
            $(`#${prefijo}-${i}`).on('click', () => {
                if (prefijo === 'producto') {
                    agregarProducto(producto);
                } else {
                    eliminarProducto(i);
                };
            });
        });
    };
    
    const mostrarProductosDOM = () => {
        $.getJSON(URL_JSON, (productos) => {
            productos.forEach((producto, i) => {
                const articulos = `
                    <div class="producto">
                        <img class="imagen" src="./img/${producto.imagen}" alt="">
                        <div class="detalle">
                            <h3 class="nombre">${producto.nombre}</h3>
                            <div class="agregar">
                                <p class="precio">$${producto.precio}</p>
                                <button id="producto-${i}" class="agregarProducto">Agregar</button>    
                            </div>
                        </div>
                    </div>`;
                $('#productos').append(articulos);
            });
            agregarEventoClick(productos, 'producto');
        });
    }
    
    const actualizarCarritoDOM = () => {
        $('#cantidad-productos').html(`${miCarrito.items.length}`);
        $('#total').html(`$${miCarrito.total}`);
        $('#carrito').html('');

        if (miCarrito.items.length === 0) {
            $('#carrito').html('<div><p class="parrafoCarrito">El carrito está vacio</p></div>');
            return;
        }
    
        miCarrito.items.forEach((producto, i) => {
            const detalleCarrito = `
                <div class="producto-carrito">
                    <img class="imagen-carrito" src="./img/${producto.imagen}" alt="">
                    <div class="datos-producto-carrito">
                        <h3 class="nombre-carrito">${producto.nombre}</h3>
                        <div class="precio-container">
                            <p class="precio-carrito">$${producto.precio}</p>
                            <button id="item-${i}" class="eliminar">x</button>
                        </div>    
                    </div>
                </div>`;
            $('#carrito').append(detalleCarrito);
        });

        agregarEventoClick(miCarrito.items, 'item');
    };
    
    const agregarProducto = (producto) => {
        miCarrito.agregarAlCarrito(producto);
        actualizarCarritoDOM();
    };
    
    const eliminarProducto = (posicion) => {
        miCarrito.quitarDelCarrito(posicion);
        actualizarCarritoDOM();
    }
    
    const eliminarProductos = () => {
        miCarrito.vaciarCarrito();
        actualizarCarritoDOM();
    }
    
    if (!localStorage.getItem('carrito')) {
        localStorage.setItem('carrito', JSON.stringify({ items: [], total: 0 }));
    }
    
    const carritoInicial = JSON.parse(localStorage.getItem('carrito'));
    const miCarrito = new Carrito(carritoInicial);

    $('#mostrar-productos').on('click', () => {
        mostrarProductosDOM();
        $('#mostrar-productos').hide();
    });

    actualizarCarritoDOM();

    $('#verCarrito').on('click', () => {
        $('#verCarrito').hide();
        $('#detalleCarrito').show();
        $('#ocultarCarrito').show();
    });

    $('#ocultarCarrito').on('click', () => {
        $('#ocultarCarrito').hide();
        $('#detalleCarrito').hide();
        $('#verCarrito').show();
    });

    $('#confirmarCompra').on('click', () => {
        if (miCarrito.items.length > 0) {
            $('#contenedor').hide();
            $('#mensajeCompra').show();
            miCarrito.vaciarCarrito();
            $('#nuevaCompra').on('click', () => window.location.reload());
        }
    });

    $('#vaciarCarrito').on('click', () => eliminarProductos());
});
