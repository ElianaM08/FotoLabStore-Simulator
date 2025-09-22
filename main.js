document.addEventListener("DOMContentLoaded", () => {
  const fotografias = [
    { nombre: "Atardecer", precio: 3500, imagen: "assets/atardecer.jpg" },
    { nombre: "Montaña", precio: 4000, imagen: "assets/montaña.jpg" },
    { nombre: "Margaritas", precio: 3000, imagen: "assets/margaritas.jpg" }
  ];

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let total = carrito.reduce((acc, foto) => acc + foto.precio, 0);

  const slideImg = document.getElementById("slide-img");
  const slideTitle = document.getElementById("slide-title");
  const addBtn = document.getElementById("add-to-cart");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const carritoPanel = document.getElementById("carrito");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalTexto = document.getElementById("total");

  let indice = 0;
  let interval = null;

  function mostrarSlide() {
    const foto = fotografias[indice];
    slideImg.src = foto.imagen;
    slideImg.alt = foto.nombre;
    slideTitle.textContent = `${foto.nombre} - $${foto.precio}`;
  }

  function siguienteSlide() { indice = (indice + 1) % fotografias.length; mostrarSlide(); }
  function anteriorSlide() { indice = (indice - 1 + fotografias.length) % fotografias.length; mostrarSlide(); }
  function iniciarCarrusel() { interval = setInterval(siguienteSlide, 5000); }
  function detenerCarrusel() { clearInterval(interval); }

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


  nextBtn.addEventListener("click", () => { detenerCarrusel(); siguienteSlide(); iniciarCarrusel(); });
  prevBtn.addEventListener("click", () => { detenerCarrusel(); anteriorSlide(); iniciarCarrusel(); });


  document.getElementById("cerrar-carrito").addEventListener("click", () => carritoPanel.classList.remove("show"));
  document.getElementById("reiniciar").addEventListener("click", () => { carrito = []; total = 0; actualizarCarrito(); });


  document.getElementById("finalizar").addEventListener("click", () => {
      if (carrito.length === 0) return;
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

  });

  mostrarSlide();
  actualizarCarrito();
  iniciarCarrusel();
});
