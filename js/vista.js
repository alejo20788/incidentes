// Vista: Manipula la interfaz gráfica y comunica estados accesibles
export const Vista = {
  elementos: {
    formulario: document.querySelector('#registro form'),
    tipo: document.querySelector('#tipo-incidente'),
    fecha: document.querySelector('#fecha-incidente'),
    prioridad: document.querySelector('#prioridad-incidente'),
    descripcion: document.querySelector('#descripcion-incidente'),
    contenedorLista: document.querySelector('.incidents-container'),
    mensajeEstado: document.querySelector('#mensaje-estado')
  },

  // Mapear prioridad en español al nombre de clase CSS en inglés
  obtenerClasePrioridad(prioridad) {
    const mapa = {
      alta: 'high',
      media: 'medium',
      baja: 'low'
    };
    return mapa[prioridad.toLowerCase()] || 'low';
  },

  renderizarLista(incidentes) {
    if (!this.elementos.contenedorLista) return;
    this.elementos.contenedorLista.innerHTML = '';

    if (incidentes.length === 0) {
      this.elementos.contenedorLista.innerHTML = '<p class="text-muted">No existen incidentes registrados.</p>';
      return;
    }

    incidentes.forEach((incidente) => {
      const claseColor = this.obtenerClasePrioridad(incidente.prioridad);
      const tarjeta = document.createElement('article');
      
      // Asignar clases exactas coincidentes con styles.css
      tarjeta.className = `incident-item priority-${claseColor}`;
      tarjeta.innerHTML = `
        <div class="incident-meta">
          <span class="badge badge-${claseColor}">${incidente.prioridad.toUpperCase()}</span>
          <span class="incident-id">${incidente.id}</span>
        </div>
        <h3>${incidente.tipo}</h3>
        <p class="incident-summary">${incidente.descripcion}</p>
        <time datetime="${incidente.fecha}">${incidente.fecha}</time>
      `;
      this.elementos.contenedorLista.append(tarjeta);
    });
  },

  notificar(mensaje, esError = false) {
    if (!this.elementos.mensajeEstado) return;
    this.elementos.mensajeEstado.textContent = mensaje;
    this.elementos.mensajeEstado.style.color = esError ? '#dc2626' : '#16a34a';
  },

  limpiarFormulario() {
    this.elementos.formulario.reset();
  }
};