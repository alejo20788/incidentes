// Esperar a que el HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // 1. Localizar elementos del formulario usando querySelector
  const form = document.querySelector("#registro form");
  const tipoInput = document.querySelector("#tipo-incidente");
  const fechaInput = document.querySelector("#fecha-incidente");
  const prioridadInput = document.querySelector("#prioridad-incidente");
  const descripcionInput = document.querySelector("#descripcion-incidente");
  const mensajeEstado = document.querySelector("#mensaje-estado");

  // Si no encuentra el formulario, termina para evitar errores
  if (!form) return;

  // 2. Escuchar el evento submit del formulario
  form.addEventListener("submit", (event) => {
    // Evitar que la página se recargue por defecto
    event.preventDefault();

    // Limpiar mensajes previos
    mensajeEstado.textContent = "";
    mensajeEstado.style.color = "";

    // 3. Capturar y limpiar los valores ingresados
    const tipo = tipoInput.value.trim();
    const fecha = fechaInput.value.trim();
    const prioridad = prioridadInput.value.trim();
    const descripcion = descripcionInput.value.trim();

    // 4. Validación dinámica con reglas de negocio (JavaScript)
    if (!tipo || !fecha || !prioridad || !descripcion) {
      mensajeEstado.textContent =
        "Por favor, complete todos los campos obligatorios marcados con (*).";
      mensajeEstado.style.color = "#dc2626"; // Rojo de error
      return;
    }

    if (descripcion.length < 30) {
      mensajeEstado.textContent = `La descripción es muy breve (${descripcion.length}/30 caracteres). Detalle mejor lo sucedido.`;
      mensajeEstado.style.color = "#dc2626";
      descripcionInput.focus();
      return;
    }

    // 5. Retroalimentación exitosa si pasó las pruebas
    mensajeEstado.textContent =
      "¡Incidente validado con éxito! Listo para registrar.";
    mensajeEstado.style.color = "#16a34a"; // Verde de éxito

    // (Opcional) Limpiar el formulario tras validación
    form.reset();
  });
});
