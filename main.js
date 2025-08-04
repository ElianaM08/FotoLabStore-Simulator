const fotografias = [
  {
    nombre: "Atardecer",
    precio: 3500,
    imagen: "assets/atardecerMontaña.jpg"
  },
  {
    nombre: "Ciudad de noche",
    precio: 4000,
    imagen: "assets/ciudadNoche.jpg"
  },
  {
    nombre: "Bosque nevado",
    precio: 3000,
    imagen: "assets/bosqueNevado.jpg"
  }
];

let carrito = [];
let total = 0;

const galeria = document.getElementById("galeria");
const listaCarrito = document.getElementById("lista-carrito");
const totalTexto = document.getElementById("total");

for (let i = 0; i < fotografias.length; i++) {
  const foto = fotografias[i];
  const div = document.createElement("div");
  div.classList.add("foto");
  div.innerHTML = `
    <img src="${foto.imagen}" alt="${foto.nombre}" class="foto-img">
    <h3>${foto.nombre}</h3>
    <p>Precio: $${foto.precio}</p>
    <button onclick="agregarAlCarrito(${i})">Agregar al carrito</button>
  `;
  galeria.appendChild(div);
}


let nombreCliente = prompt("¡Bienvenido a la Tienda de Fotografías! ¿Cuál es tu nombre?");
if (!nombreCliente) {
  nombreCliente = "Cliente invitado";
}
alert(`Hola, ${nombreCliente}. ¡Disfrutá tu visita!`);


function agregarAlCarrito(indice) {
  const foto = fotografias[indice];
  carrito.push(foto);
  total += foto.precio;
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  for (let i = 0; i < carrito.length; i++) {
    const foto = carrito[i];
    const li = document.createElement("li");
    li.textContent = `${foto.nombre} - $${foto.precio}`;
    listaCarrito.appendChild(li);
 } 
  totalTexto.textContent = `Total: $${total}`;
}

document.getElementById("finalizar").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert(`Gracias por tu compra, ${nombreCliente}. Total a pagar: $${total}`);
  console.log("Compra:", carrito);
  carrito = [];
  total = 0;
  actualizarCarrito();
});

document.getElementById("reiniciar").addEventListener("click", () => {
  if (confirm("¿Estás seguro de vaciar el carrito?")) {
    carrito = [];
    total = 0;
    actualizarCarrito();
  }
});

mostrarGaleria();
