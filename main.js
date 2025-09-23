document.addEventListener("DOMContentLoaded", () => {

  // === ELEMENTOS DEL DOM ===
  const bienvenida = document.getElementById("bienvenida");
  const ingresarBtn = document.getElementById("ingresar");

  const carrusel = document.getElementById("carrusel");
  const slideImg = document.getElementById("slide-img");
  const slideTitle = document.getElementById("slide-title");
  const addBtn = document.getElementById("add-to-cart");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  const carritoPanel = document.getElementById("carrito");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalTexto = document.getElementById("total");

  let fotografias = [];
  let indice = 0;
  let interval = null;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let total = carrito.reduce((acc, foto) => acc + foto.precio, 0);

  // === FUNCIONES ===

  // Cargar productos desde JSON
  async function cargarProductos() {
    try {
      const response = await fetch("products.json"); // tu archivo JSON
      const data = await response.json();
      fotografias = data;
      mostrarSlide();
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  }

  // Mostrar slide actual
  function mostrarSlide() {
    if(fotografias.length === 0) return;
    const foto = fotografias[indice];
    slideImg.src = foto.imagen;
    slideImg.alt = foto.nombre;
    slideTitle.textContent = `${foto.nombre} - $${foto.precio}`;
  }

  // Avanzar y retroceder
  function siguienteSlide() { indice = (indice + 1) % fotografias.length; mostrarSlide(); }
  function anteriorSlide() { indice = (indice - 1 + fotografias.length) % fotografias.length; mostrarSlide(); }

  function iniciarCarrusel() { interval = setInterval(siguienteSlide, 5000); }
  function detenerCarrusel() { clearInterval(interval); }

  // Carrito
  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    carrito.forEach(foto => {
      const li = document.createElement("li");
      li.textContent = `${foto.nombre} - $${foto.precio}`;
      listaCarrito.appendChild(li);
    });
    totalTexto.textContent = `Total: $${total}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // === EVENTOS ===

  // Botón ingresar
  ingresarBtn.addEventListener("click", async () => {
    bienvenida.classList.add("hidden");
    carrusel.classList.remove("hidden");

    await cargarProductos();
    iniciarCarrusel();
  });

  // Botones del carrusel
  nextBtn.addEventListener("click", () => { detenerCarrusel(); siguienteSlide(); iniciarCarrusel(); });
  prevBtn.addEventListener("click", () => { detenerCarrusel(); anteriorSlide(); iniciarCarrusel(); });

  // Agregar al carrito
  addBtn.addEventListener("click", () => {
    const foto = fotografias[indice];
    carrito.push(foto);
    total += foto.precio;
    actualizarCarrito();
    carritoPanel.classList.add("show");

    Toastify({
      text: "✅ Producto agregado al carrito",
      duration: 2000,
      gravity: "top",
      position: "center",
      backgroundColor: "#007bff",
      stopOnFocus: true,
    }).showToast();
  });

  // Botones del carrito
  document.getElementById("cerrar-carrito").addEventListener("click", () => carritoPanel.classList.remove("show"));
  document.getElementById("reiniciar").addEventListener("click", () => { carrito = []; total = 0; actualizarCarrito(); });
  document.getElementById("finalizar").addEventListener("click", () => {
    if(carrito.length === 0) return;
    carrito = [];
    total = 0;
    actualizarCarrito();

    Toastify({
      text: "🎉 Compra realizada con éxito",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "#28a745",
    }).showToast();

    carritoPanel.classList.remove("show");
  });

  // Inicializar carrito al cargar la página
  actualizarCarrito();

});
