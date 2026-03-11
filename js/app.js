import { fetchAllPokemonList, fetchPokemonDetails, fetchPokemonByType } from './api.js';
import { renderGrid, renderPagination, populateTypeFilter } from './ui.js';

const ITEMS_PER_PAGE = 20;
let allPokemons = [];
let currentList = [];
let filteredPokemons = [];
let currentPage = 1;
let currentType = '';
let currentSearch = '';

const gridContainer = document.getElementById('pokemon-grid');
const searchInput = document.getElementById('search-input');
const typeSelect = document.getElementById('type-filter');

async function init() {
    try {
        populateTypeFilter(typeSelect);

        // Busca lista completa inicial
        allPokemons = await fetchAllPokemonList();
        currentList = [...allPokemons];
        
        // Aplica filtros iniciais (vazios) e renderiza
        applyFilters();

        // Configura eventos
        setupEventListeners();
    } catch (error) {
        gridContainer.innerHTML = '<div class="loading">Erro ao carregar a aplicação. Tente recarregar.</div>';
        console.error(error);
    }
}

function setupEventListeners() {
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        currentPage = 1;
        applyFilters();
    });

    // Evento de Filtro por Tipo
    typeSelect.addEventListener('change', async (e) => {
        currentType = e.target.value;
        currentPage = 1;
        
        // Limpa a grid e mostra loading IMEDIATAMENTE para evitar confusão visual
        // enquanto a requisição assíncrona acontece
        gridContainer.innerHTML = '<div class="loading">Buscando pokémons...</div>';
        
        if (currentType) {
            currentList = await fetchPokemonByType(currentType);
        } else {
            currentList = [...allPokemons];
        }
        
        applyFilters();
    });
}

function applyFilters() {
    if (currentSearch) {
        filteredPokemons = currentList.filter(p => p.name.includes(currentSearch));
    } else {
        filteredPokemons = [...currentList];
    }
    
    updateView();
}

async function updateView() {
    gridContainer.innerHTML = '<div class="loading">Carregando...</div>';

    if (filteredPokemons.length === 0) {
        gridContainer.innerHTML = '<div class="loading">Nenhum Pokémon encontrado.</div>';
        return renderPagination(0, 0, () => {});
    }

    // Calcula paginação
    const totalPages = Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    // Pega os itens da página atual
    const pageItems = filteredPokemons.slice(startIndex, endIndex);

    const detailedPokemons = await Promise.all(
        pageItems.map(p => fetchPokemonDetails(p.url))
    );

    renderGrid(detailedPokemons, gridContainer);

    renderPagination(currentPage, totalPages, (newPage) => {
        currentPage = newPage;
        updateView();
        document.querySelector('.search-section').scrollIntoView({ behavior: 'smooth' });
    });
}

// Inicialização
init();
