const typeColors = {
    grass: '#70A83B',
    fire: '#F76545',
    water: '#76BDFE',
    bug: '#A8B820',
    normal: '#A8A878',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#E0C068',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    dragon: '#7038F8'
};

export const typeTranslations = {
    grass: 'Planta',
    fire: 'Fogo',
    water: 'Água',
    bug: 'Inseto',
    normal: 'Normal',
    poison: 'Venenoso',
    electric: 'Elétrico',
    ground: 'Terra',
    fairy: 'Fada',
    fighting: 'Lutador',
    psychic: 'Psíquico',
    rock: 'Pedra',
    ghost: 'Fantasma',
    ice: 'Gelo',
    dragon: 'Dragão'
};

function getPokemonCardHTML(pokemon) {
    const mainType = pokemon.types[0];
    const color = typeColors[mainType] || '#888';
    
    const typesText = pokemon.types
        .map(t => typeTranslations[t] || t)
        .join(' / ');
    
    const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;

    return `
        <div class="pokemon-card">
            <div class="card-header">
                <span class="pokemon-type" style="color: ${color}; font-size: 0.75rem;">${typesText}</span>
                <span class="pokemon-id">${formattedId}</span>
            </div>
            <img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon-image" loading="lazy">
            <h3 class="pokemon-name">${pokemon.name}</h3>
        </div>
    `;
}

export function renderGrid(pokemons, container) {
    if (pokemons.length === 0) {
        container.innerHTML = '<div class="loading">Nenhum Pokémon encontrado.</div>';
        return;
    }

    container.innerHTML = pokemons.map(getPokemonCardHTML).join('');
}

export function renderPagination(currentPage, totalPages, onPageChange) {
    const container = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    // Helpers para gerar botões
    const createButton = (text, disabled, onClick) => `
        <button class="page-btn" ${disabled ? 'disabled' : ''} onclick="${onClick}">
            ${text}
        </button>
    `;

    const createPageNum = (num, isActive) => `
        <div class="page-number ${isActive ? 'active' : ''}" onclick="window.handlePageChange(${num})">
            ${num}
        </div>
    `;
    window.handlePageChange = onPageChange;

    // Lógica de range
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

    // Gera array de números de página
    const pagesHTML = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
        .map(num => createPageNum(num, num === currentPage))
        .join('');

    container.innerHTML = `
        ${createButton('&larr; Anterior', currentPage === 1, `window.handlePageChange(${currentPage - 1})`)}
        ${pagesHTML}
        ${createButton('Próximo &rarr;', currentPage === totalPages, `window.handlePageChange(${currentPage + 1})`)}
    `;
}

export function populateTypeFilter(selectElement) {
    const optionsHTML = Object.entries(typeTranslations)
        .sort((a, b) => a[1].localeCompare(b[1])) // Ordena alfabeticamente
        .map(([key, label]) => `<option value="${key}">${label}</option>`)
        .join('');

    selectElement.innerHTML = `<option value="">Todos os Tipos</option>${optionsHTML}`;
}
