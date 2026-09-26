import { Modelo } from "./modelo.js";
import { Vista } from "./vista.js";

const Controlador = {
  async iniciar() {
    this.enlazarEventos();
    try {
      Vista.mostrarCargando(true);
      const incidentes = await Modelo.cargarIncidentesIniciales();
      Vista.renderizarLista(incidentes);
      Vista.notificar("Conexión API REST exitosa.", false);
    } catch (error) {
      Vista.notificar("Error al conectar con la API REST.", true);
    } finally {
      Vista.mostrarCargando(false);
    }
  },

  enlazarEventos() {
    Vista.elementos.formulario?.addEventListener("submit", (e) => this.procesarRegistro(e));
  },

  async procesarRegistro(evento) {
    evento.preventDefault();
    const tipo = Vista.elementos.tipo.value.trim();
    const tipoTexto = Vista.elementos.tipo.options[Vista.elementos.tipo.selectedIndex]?.text || "";
    const fecha = Vista.elementos.fecha.value.trim();
    const prioridad = Vista.elementos.prioridad.value.trim();
    const descripcion = Vista.elementos.descripcion.value.trim();

    if (!tipo || !fecha || !prioridad || !descripcion) {
      return Vista.notificar("Complete todos los campos requeridos (*).", true);
    }

    const nuevoIncidente = { tipo: tipoTexto, prioridad, fecha, descripcion };

    try {
      Vista.mostrarCargando(true); // Se dispara el estado visual "Cargando"
      await Modelo.guardarIncidente(nuevoIncidente);
      Vista.renderizarLista(Modelo.obtenerIncidentes());
      Vista.notificar("Incidente procesado vía API REST con éxito.", false);
      Vista.limpiarFormulario();
    } catch (error) {
      Vista.notificar(error.message, true);
    } finally {
      Vista.mostrarCargando(false);
    }
  },
};
document.addEventListener("DOMContentLoaded", () => Controlador.iniciar());