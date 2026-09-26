export const Vista = {
  elementos: {
    formulario: document.querySelector('#registro form'),
    tipo: document.querySelector('#tipo-incidente'),
    fecha: document.querySelector('#fecha-incidente'),
    prioridad: document.querySelector('#prioridad-incidente'),
    descripcion: document.querySelector('#descripcion-incidente'),
    contenedorLista: document.querySelector('.incidents-container'),
    mensajeEstado: document.querySelector('#mensaje-estado'),
    boton: document.querySelector('#registro form button')
  },

  obtenerClasePrioridad(prioridad) {
    const mapa = { alta: 'high', media: 'medium', baja: 'low' };
    return mapa[prioridad.toLowerCase()] || 'low';
  },

  renderizarLista(incidentes) {
    if (!this.elementos.contenedorLista) return;
    this.elementos.contenedorLista.innerHTML = '';
    if (incidentes.length === 0) {
      this.elementos.contenedorLista.innerHTML = '<p class="text-muted">No existen incidentes registrados.</p>';
      return;
    }
    incidentes.forEach((inc) => {
      const clase = this.obtenerClasePrioridad(inc.prioridad);
      const tarjeta = document.createElement('article');
      tarjeta.className = `incident-item priority-${clase}`;
      tarjeta.innerHTML = `
        <div class="incident-meta">
          <span class="badge badge-${clase}">${inc.prioridad.toUpperCase()}</span>
          <span class="incident-id">${inc.id}</span>
        </div>
        <h3>${inc.tipo}</h3>
        <p class="incident-summary">${inc.descripcion}</p>
        <time datetime="${inc.fecha}">${inc.fecha}</time>
      `;
      this.elementos.contenedorLista.append(tarjeta);
    });
  },

  // Manejo de Estados Intermedios
  mostrarCargando(estado) {
    if(estado) {
      this.elementos.boton.disabled = true;
      this.elementos.boton.textContent = 'Procesando...';
      this.elementos.mensajeEstado.textContent = 'Conectando con el servidor...';
      this.elementos.mensajeEstado.style.color = '#0284c7';
    } else {
      this.elementos.boton.disabled = false;
      this.elementos.boton.textContent = 'Enviar Reporte de Incidente';
    }
  },

  notificar(mensaje, esError = false) {
    if (!this.elementos.mensajeEstado) return;
    this.elementos.mensajeEstado.textContent = mensaje;
    this.elementos.mensajeEstado.style.color = esError ? '#dc2626' : '#16a34a';
  },

  limpiarFormulario() { this.elementos.formulario.reset(); }
};