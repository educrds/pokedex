import environment from './environment.js';

const BASE_URL = environment.apiBaseUrl;

// Cache simples para evitar requisições repetidas da lista completa
let allPokemonCache = null;
const typeCache = {};

/**
 * Busca a lista completa de Pokémons (apenas nomes e URLs) para permitir busca client-side
 * Limitado a 1000 para performance inicial, mas pode ser aumentado
 */
export async function fetchAllPokemonList() {
    if (allPokemonCache) return allPokemonCache;

    try {
        const response = await fetch(`${BASE_URL}/pokemon?limit=1000`);
        const data = await response.json();
        allPokemonCache = data.results;
        return data.results;
    } catch (error) {
        console.error('Erro ao buscar lista de pokémons:', error);
        return [];
    }
}

/**
 * Busca a lista de Pokémons de um tipo específico
 */
export async function fetchPokemonByType(type) {
    if (typeCache[type]) return typeCache[type];

    try {
        const response = await fetch(`${BASE_URL}/type/${type}`);
        const data = await response.json();
        // Normaliza a estrutura para ficar igual ao fetchAllPokemonList ({ name, url })
        const normalizedList = data.pokemon.map(p => p.pokemon);
        typeCache[type] = normalizedList;
        return normalizedList;
    } catch (error) {
        console.error(`Erro ao buscar pokémons do tipo ${type}:`, error);
        return [];
    }
}

/**
 * Busca os detalhes de um Pokémon específico pela URL
 */
export async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            types: data.types.map(t => t.type.name),
            image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default
        };
    } catch (error) {
        console.error('Erro ao buscar detalhes do pokémon:', error);
        return null;
    }
}
