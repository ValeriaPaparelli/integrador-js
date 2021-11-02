class Carrito { 
    constructor(carritoInicial){
        this.items = carritoInicial.items; 
        this.total = carritoInicial.total;
    }
    
    agregarAlCarrito = (item) => { 
        this.items.push(item); 
        this.total += item.precio;
        this.guardarEnStorage();
    }

    quitarDelCarrito = (posicion) => {
        let itemEliminado = this.items.splice(posicion, 1);
        this.total -= itemEliminado[0].precio;
        this.guardarEnStorage();
    }

    vaciarCarrito = () => {
        this.items = [];
        this.total = 0;
        this.guardarEnStorage();
    }

    guardarEnStorage = () => {
        localStorage.setItem('carrito', JSON.stringify(this));
    }
}
