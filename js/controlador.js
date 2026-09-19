// js/controlador.js
// Controlador: Coordina eventos de usuario, valida y sincroniza M-V
import { Modelo } from "./modelo.js";
import { Vista } from "./vista.js";

const Controlador = {
  async iniciar() {
    this.enlazarEventos();

    // Carga inicial mediante Fetch API desde el servidor
    try {
      const incidentes = await Modelo.cargarIncidentesIniciales();
      Vista.renderizarLista(incidentes);
      Vista.notificar("Incidentes cargados desde el servicio.", false);
    } catch (error) {
      Vista.notificar(
        "No fue posible cargar los datos del servidor.",
        true
      );
    }
  },

  enlazarEventos() {
    Vista.elementos.formulario?.addEventListener("submit", (e) =>
      this.procesarRegistro(e)
    );
  },

  async procesarRegistro(evento) {
    evento.preventDefault();

    const tipo = Vista.elementos.tipo.value.trim();
    const tipoTexto =
      Vista.elementos.tipo.options[Vista.elementos.tipo.selectedIndex]?.text || "";
    const fecha = Vista.elementos.fecha.value.trim();
    const prioridad = Vista.elementos.prioridad.value.trim();
    const descripcion = Vista.elementos.descripcion.value.trim();

    // 1. Validación de campos obligatorios en el cliente
    if (!tipo || !fecha || !prioridad || !descripcion) {
      Vista.notificar("Complete todos los campos requeridos (*).", true);
      return;
    }

    // 2. Validación de longitud descriptiva
    if (descripcion.length < 30) {
      Vista.notificar(
        `Descripción insuficiente (${descripcion.length}/30 caracteres requeridos).`,
        true
      );
      Vista.elementos.descripcion.focus();
      return;
    }

    // 3. Crear entidad para enviar
    const nuevoIncidente = {
      tipo: tipoTexto,
      prioridad: prioridad,
      fecha: fecha.replace("T", " "),
      descripcion: descripcion,
    };

    // 4. Enviar al servidor Node.js y actualizar la interfaz
    try {
      await Modelo.guardarIncidente(nuevoIncidente);
      Vista.renderizarLista(Modelo.obtenerIncidentes());
      Vista.notificar(
        "Incidente guardado y procesado por el servidor con éxito.",
        false
      );
      Vista.limpiarFormulario();
    } catch (error) {
      Vista.notificar(error.message, true);
    }
  },
};

document.addEventListener("DOMContentLoaded", () => Controlador.iniciar());