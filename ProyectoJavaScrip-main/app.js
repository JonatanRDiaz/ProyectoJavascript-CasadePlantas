// Primero defino las variables que luego voy a usar//
const divMaceta = document.querySelector("#maceta")
const divCactus = document.querySelector("#cactuss")
const divExterior = document.querySelector("#exteriores")
const divInterior = document.querySelector("#interiores")
const divCarrito = document.querySelector("#carrito")
const divTotalCarrito = document.querySelector("#totalCarrito")
// Para crear los productos en el listado genero una función que llama al .js//
agregarProductos(divMaceta)
function agregarProductos() {
   productos.forEach((producto) => {
    let divIn = document.createElement("div");
    divIn.className = "col-sm";
    console.log(producto.nombreseparado)
    divIn.innerHTML = `
    <div class="card card-products" style="width: 18rem;">
    <img src=${producto.img} class="card-img-top" alt=${producto.descripcion} height="150px">
    <div class="card-body">
    <h5 class="card-title ${producto.nombre}">${producto.nombreseparado}</h5>
    <p class="precioProd" > Precio $ ${producto.precio}</p>
     <button id=${producto.nombre} class="btn btn-success nombre" onclick="agregarACarrito(${productos.indexOf(producto)})">Agregar Al Carrito</button>
    </div></div>`;
     switch(producto.familiaProducto) {
     case "macetas":
     divMaceta.appendChild(divIn);
     break;
     case "cactus":
     divCactus.appendChild(divIn);
     break;
     case "interior":
     divInterior.appendChild(divIn);
     break;
     case "exterior":
     divExterior.appendChild(divIn);
     break;
  }
  })
}


// utilizo jquery para hacer un buscador por rubro//
$(document).ready(function(){
    $("#name").on('change',function(){
      $(".data").hide();       
       $(".data").delay(200);
      $("#" + $(this).val()).slideDown("low");  
    }).change();
  })

  // utilizo jquery para hacer una animación cuando se selecciona un item//
  $(document).ready(function () {
    // recorro todos los productos para buscar el nombre de la clase que puse, para que solo se active si se hizo click en ese elemento//
    productos.forEach((producto) => {
      $(`#${producto.nombre}`).click(function () {
        // genero una nueva clase, que luego uso en CSS//
        $(this).addClass("activo");
        // genero una nueva clase, que luego uso en CSS//
        setTimeout(function () {
          $(`#${producto.nombre}`).addClass("exitoso");
        }, 0);
        // elimino las clases, para que vuelva el Boton a su estado inicial//
        setTimeout(function () {
          $(`#${producto.nombre}`).removeClass("activo");
          $(`#${producto.nombre}`).removeClass("exitoso");
        }, 3200);
      });
    });
  });

//armo un carrito vacio//
  let carrito = localStorage.carrito ? JSON.parse(localStorage.carrito): []
 //genero una función donde voy a agregar los elementos al carrito//
  function agregarACarrito(index) {
    // busco el producto dentro del js de productos  //
    var elemento = productos[index];
    // chequeo si el carrito tiene data//
    if (carrito.length > 0) {
      // genero una bandera, para ver si existe el elemento en el carrito, si es así le agrego cantidad //
      var flagExistencia = true;
      for (var i = 0; i < carrito.length; i++) {
        if (elemento.nombre == carrito[i].nombre) {
          carrito[i].cantidad++;
          flagExistencia = false;
        }
      }
      // en caso que no exista genero el elemento en el carrito //
      if (flagExistencia) {
        elemento.cantidad = 1;
        carrito.push(elemento);
      }
      // si el carrito esta vacío le agrego el primer elemento //
    } else {
      elemento.cantidad = 1;
      carrito.push(elemento);
 
    }
    //llamo a la funcion para crear la tabla visual del carrito//
    loadCarrito();
    localStorage.carrito = JSON.stringify(carrito);
  }


   function loadCarrito() {
     // Genero una cabecera de la tabla//
    var tablaHeader = `<table class="table table-hover table-success finalizar-pedido">
    <thead>
      <tr class="items">
        <th scope="col">#</th>
        <th scope="col">Producto</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Precio</th>
        <th scope="col">Subtotal</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>`;
    var total = 0;
    //Icono para eliminar el elemento//
    var iconoEliminar = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>`;
    //genero las variables necesarias tanto para el cuerpo como para el pie de tabla//
    var tablaBody = "";
    var tablaFooter="";
     divCarrito.innerHTML = tablaHeader;
     divTotalCarrito.innerHTML = "";
     var indice= 0;
     if (carrito.length > 0) {
       //creo una variable para tener el total//
      var sumador = 0;
       // recorro el carrito con cada elemento que contiene para colocar los datos en el cuerpo//
      carrito.forEach((e) => {
      //HTML del Body//
      tablaBody += `<tr>
      <th scope="row">${carrito.indexOf(e)}</th>
      <td>${e.nombreseparado}</td>
      <td>${e.cantidad}</td>
      <td>$${e.precio}</td>
      <td>$${parseInt(e.cantidad) * parseInt(e.precio)}</td>
      <td><span class="icono-eliminar" onclick="eliminarItem(${carrito.indexOf(e)})">${iconoEliminar}</span></td>
      </tr>`;
      //suma para calcular el total//
      sumador = sumador + e.precio * e.cantidad;
      });
      // fin de la tabla con el pie, incluido el total//
      var tablaFooter = `<tr>
      <td colspan="3"></td>
      <td class="total">TOTAL</td>
      <td class="monto">$${sumador}</td>
      <td></td>
    </tr>
    </tbody>
    </table>`;
    // utilizo jquery para poder agregar la info al html y que se pueda visualizar//
      $("#carrito").html(tablaHeader + tablaBody + tablaFooter);
  
     let divTot = document.createElement("div");
     divTot.innerHTML = `<p class="total"> Total: ${sumador}</p>`;
      divTotalCarrito.appendChild(divTot);
  
   }
  //con esta función se eliminará un elemento en especifico//
   }
   function eliminarItem(index) {  
    carrito[index].cantidad = 0;
    carrito.splice(index, 1);
    loadCarrito();
  }
// elimino completamente el carrito a través del botón del HTML//

  function eliminarCarritoCompleto() {
    if (carrito.length > 0) {
      divCarrito.innerHTML = "";
      divTotalCarrito.innerHTML = "";
      carrito = []
      localStorage.carrito = JSON.stringify(carrito);
    };
  }


  // Gracias Profe por todo lo aprendido :) !! //
  //Jony//