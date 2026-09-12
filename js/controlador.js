// Controlador: Coordina eventos de usuario, valida y sincroniza M-V
import { Modelo } from "./modelo.js";
import { Vista } from "./vista.js";

const Controlador = {
  async iniciar() {
    this.enlazarEventos();

    // Carga inicial mediante Fetch API
    try {
      const incidentes = await Modelo.cargarIncidentesIniciales();
      Vista.renderizarLista(incidentes);
      Vista.notificar("Incidentes cargados desde el servicio simulado.", false);
    } catch (error) {
      Vista.notificar(
        "No fue posible cargar los datos simulados iniciales.",
        true,
      );
    }
  },

  enlazarEventos() {
    Vista.elementos.formulario?.addEventListener("submit", (e) =>
      this.procesarRegistro(e),
    );
  },

  procesarRegistro(evento) {
    evento.preventDefault();

    const tipo = Vista.elementos.tipo.value.trim();
    const tipoTexto =
      Vista.elementos.tipo.options[Vista.elementos.tipo.selectedIndex]?.text ||
      "";
    const fecha = Vista.elementos.fecha.value.trim();
    const prioridad = Vista.elementos.prioridad.value.trim();
    const descripcion = Vista.elementos.descripcion.value.trim();

    // 1. Validación de campos obligatorios
    if (!tipo || !fecha || !prioridad || !descripcion) {
      Vista.notificar("Complete todos los campos requeridos (*).", true);
      return;
    }

    // 2. Validación de longitud descriptiva
    if (descripcion.length < 30) {
      Vista.notificar(
        `Descripción insuficiente (${descripcion.length}/30 caracteres requeridos).`,
        true,
      );
      Vista.elementos.descripcion.focus();
      return;
    }

    // 3. Crear entidad estructurada
    const nuevoIncidente = {
      id: `INC-${Date.now().toString().slice(-4)}`,
      tipo: tipoTexto,
      prioridad: prioridad,
      fecha: fecha.replace("T", " "),
      descripcion: descripcion,
    };

    // 4. Actualizar modelo y refrescar vista
    Modelo.agregarIncidente(nuevoIncidente);
    Vista.renderizarLista(Modelo.obtenerIncidentes());
    Vista.notificar(
      `Incidente ${nuevoIncidente.id} registrado y anunciado correctamente.`,
      false,
    );
    Vista.limpiarFormulario();
  },
};

document.addEventListener("DOMContentLoaded", () => Controlador.iniciar());
