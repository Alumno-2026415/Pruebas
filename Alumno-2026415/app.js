const botonBuscar = document.getElementById("botonBuscar");
const inputNombre = document.getElementById("nombre");
const id = document.getElementById("Id");
const nombrePokemon = document.getElementById("nombrePokemon");
const tipoPokemon = document.getElementById("tipoPokemon");
const imagen = document.getElementById("imagen");
const sonido = document.getElementById("sonido");
const listaHabilidades = document.getElementById("listaHabilidades");

async function buscarPokemon() {
  try {
    const nombre = inputNombre.value.toLowerCase().trim();
    if (!nombre) {
      alert("Escribe el nombre de un Pokémon");
      return;
    }

    // Llamada a la PokéAPI
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!respuesta.ok) throw new Error("Pokémon no encontrado");

    const infoPokemon = await respuesta.json();

    // Mostrar datos básicos
    id.innerText = infoPokemon.id;
    nombrePokemon.innerText = infoPokemon.name;
    tipoPokemon.innerText = infoPokemon.types.map(t => t.type.name).join(", ");

    // Mostrar imagen oficial
    imagen.src = infoPokemon.sprites.other["official-artwork"].front_default;

    // Cargar sonido (PokéAPI v2)
    if (infoPokemon.cries?.latest) {
      sonido.src = infoPokemon.cries.latest;
    } else {
      sonido.removeAttribute("src");
    }

    // Mostrar habilidades
    listaHabilidades.innerHTML = "";
    infoPokemon.abilities.forEach(a => {
      const item = document.createElement("li");
      item.textContent = a.ability.name;
      listaHabilidades.appendChild(item);
    });

  } catch (error) {
    alert(error.message);
    id.innerText = "";
    nombrePokemon.innerText = "";
    tipoPokemon.innerText = "";
    imagen.removeAttribute("src");
    sonido.removeAttribute("src");
    listaHabilidades.innerHTML = "";
  }
}

// Ejecutar al hacer clic en "Buscar"
botonBuscar.addEventListener("click", e => {
  e.preventDefault();
  buscarPokemon();
});
