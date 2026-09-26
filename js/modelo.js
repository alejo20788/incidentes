export const Modelo = {
  incidentes: [],

  async cargarIncidentesIniciales() {
    const res = await fetch('/api/incidentes');
    const json = await res.json();
    if (!res.ok || json.error) throw new Error(json.error || `Error: ${res.status}`);
    this.incidentes = json.data;
    return this.incidentes;
  },

  obtenerIncidentes() { return [...this.incidentes]; },

  async guardarIncidente(nuevo) {
    const res = await fetch('/api/incidentes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo)
    });
    const json = await res.json();
    if (!res.ok || json.error) throw new Error(json.error || 'Error al guardar');
    this.incidentes.unshift(json.data);
    return json.data;
  }
};