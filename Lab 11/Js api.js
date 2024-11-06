// Definimos la clase Agente para representar a cada agente del juego
class Agente {
  constructor(nombre, rol, habilidades, imagen) {
    this.nombre = nombre;
    this.rol = rol;
    this.habilidades = habilidades;
    this.imagen = imagen;
  }
}

// Función para consumir la API y obtener los agentes
async function getAgents() {
  try {
    const response = await fetch('https://valorant-api.com/v1/agents');
    if (!response.ok) throw new Error("Error en la solicitud al API");
    const data = await response.json();

    // Mapea los datos de los agentes a instancias de la clase Agente
    return data.data.map(agent => new Agente(
      agent.displayName,
      agent.role ? agent.role.displayName : 'No role',
      agent.abilities.map(ability => ability.displayName),
      agent.displayIcon
    ));
  } catch (error) {
    console.error("Error al obtener agentes:", error);
  }
}

// Función para mostrar los agentes en el DOM y pantalla
function displayAgents(agents) {
  const container = document.getElementById('agents-container');
  container.innerHTML = ''; // Limpia el contenedor x

  agents.forEach(agent => {
    const agentCard = document.createElement('div');
    agentCard.classList.add('agent-card');

    agentCard.innerHTML = `
      <img src="${agent.imagen}" alt="${agent.nombre}" class="agent-image">
      <h2 class="agent-name">${agent.nombre}</h2>
      <p class="agent-role">Role: ${agent.rol}</p>
      <ul class="agent-abilities">
        ${agent.habilidades.map(habilidad => `<li>${habilidad}</li>`).join('')}
      </ul>
    `;

    container.appendChild(agentCard);
  });
}

// "es la barra de busqueda"
function setupSearchBar(agents) {
  const searchBar = document.getElementById('search-bar');

  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const filteredAgents = agents.filter(agent =>
      agent.nombre.toLowerCase().includes(query)
    );
    displayAgents(filteredAgents);
  });
}

// Inicializacion osea la funcion
async function init() {
  const agents = await getAgents();
  if (agents) {
    displayAgents(agents);
    setupSearchBar(agents);
  }
}

// Ejecuta la función init cuando el contenido esté cargado
document.addEventListener('DOMContentLoaded', init);

