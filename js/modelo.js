// Modelo: Gestiona el estado y el consumo de datos
export const Modelo = {
  incidentes: [],

  // Consumo con Fetch API y manejo de errores
  async cargarIncidentesIniciales() {
    try {
      const respuesta = await fetch("data/incidentes.json");
      if (!respuesta.ok) {
        throw new Error(`Error en la solicitud HTTP: ${respuesta.status}`);
      }
      const datos = await respuesta.json();
      this.incidentes = [...datos];
      return this.incidentes;
    } catch (error) {
      console.error("Fallo al consumir incidentes.json:", error);
      throw error;
    }
  },

  obtenerIncidentes() {
    return [...this.incidentes];
  },

  agregarIncidente(nuevo) {
    this.incidentes.unshift(nuevo); // Inserta al inicio
    return nuevo;
  },
};
