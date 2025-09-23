document.addEventListener("DOMContentLoaded", () => {
  const btnIngresar = document.getElementById("ingresar");

  if (btnIngresar) {
    btnIngresar.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }
});
