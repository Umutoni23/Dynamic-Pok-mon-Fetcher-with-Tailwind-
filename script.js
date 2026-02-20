const fetchBtn = document.getElementById('fetchBtn');
const pokemonInput = document.getElementById('pokemonInput');
const pokemonCard = document.getElementById('pokemonCard');
const loading = document.getElementById('loading');

fetchBtn.addEventListener('click', () => {
    const nameOrId = pokemonInput.value.trim().toLowerCase();
    if (nameOrId) {
        fetchPokemon(nameOrId);
    }
});

async function fetchPokemon(nameOrId) {
    pokemonCard.innerHTML = '';
    loading.classList.remove('hidden');
    fetchBtn.disabled = true;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Pokémon not found!');
            } else {
                throw new Error('Network response was not ok');
            }
        }
        const data = await response.json();

        displayPokemon(data);
    } catch (error) {
        pokemonCard.innerHTML = `<p class="text-red-500 font-bold">${error.message}</p>`;
    } finally {
        loading.classList.add('hidden');
        fetchBtn.disabled = false;
    }
}

function displayPokemon(data) {
    const types = data.types.map(t => `<span class="bg-gray-200 px-2 py-1 rounded mr-2">${t.type.name}</span>`).join('');

    const html = `
        <div class="bg-gray-50 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h2 class="text-xl font-bold capitalize">${data.name}</h2>
            <p class="text-gray-600">ID: #${data.id}</p>
            <p class="text-gray-600">Height: ${(data.height / 10).toFixed(1)} m</p>
            <p class="text-gray-600">Weight: ${(data.weight / 10).toFixed(1)} kg</p>
            <p class="text-gray-600">Base Experience: ${data.base_experience}</p>
            <div class="mt-2">Types: ${types}</div>
            <img src="${data.sprites.front_default}" alt="${data.name}" class="mx-auto mt-2">
            
        </div>
    `;
    pokemonCard.innerHTML = html;
}