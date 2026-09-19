// js/modelo.js
export const Modelo = {
  incidentes: [],

  // GET: Solicita datos a la ruta API del servidor Node.js
  async cargarIncidentesIniciales() {
    const res = await fetch('/api/incidentes');
    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.status}`);
    }
    this.incidentes = await res.json();
    return [...this.incidentes];
  },

  obtenerIncidentes() {
    return [...this.incidentes];
  },

  // POST: Envía el nuevo incidente por red al servidor
  async guardarIncidente(nuevo) {
    const res = await fetch('/api/incidentes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Error al guardar');
    }

    this.incidentes.unshift(data);
    return data;
  }
};