import {loadData} from './dataLoaders.js';
import {
    renderBlockArtistItem,
    renderBlockAlbumItem,
    renderTrackTileItem,
    renderTrackListItem,
    renderArtistTileItem,
    renderList} from './render.js';

/**
 * Селекторы для доступа к элементам
 */
const ELEMENTS_ID = {
    searchArtists: 'search-artists',
    searchAlbums: 'search-albums',
    searchTracks: 'search-tracks',
    topArtists: 'popular-artists',
    popularTracks: 'popular-tracks',
    searchSection: 'search-section',
    topSection: 'top-section',
    searchButton: 'search-button',
    searchInput: 'search-input'

};

/**
 * Ссылки на элементы DOM
 */
const ELEMENTS = {
    searchArtists: null,
    searchAlbums: null,
    searchTracks: null,
    topArtists: null,
    popularTracks: null,
    searchSection: null,
    topSection: null,
    searchButton: null,
    searchInput: null
}

/**
 * Соответствие отображаемых данных и шаблонов 
 */
const TEMPLATES = {
    searchArtists: renderBlockArtistItem,
    searchAlbums: renderBlockAlbumItem,
    searchTracks: renderTrackListItem,
    topArtists: renderArtistTileItem,
    popularTracks: renderTrackTileItem
};

/**
 * Текущий режим:
 * top - популярные треки/исполнителей
 * search - результаты поиска
 */
let currentMode = 'top';

/**
 * Загруженные данных
 */
const LOADED_DATA = {
    searchArtists: null,
    searchAlbums: null,
    searchTracks: null,
    topArtists: null,
    popularTracks: null
}

/**
 * В случае, если загрузка данных произойдет до построения страницы, отложим отрисовку загруженных данных до момента построения.
 */
const AFTER_PAGE_LOADED_CALLBACKS = [];

/**
 * Инициализация при построении страницы. 
 * Здесь происходит первая загрузка данных.
 */
export async function beforeLoadPage() {
    console.log('beforeLoadPage');
    prepareTop();    
}

/**
 * Вызывает рендер загруженных данных в разделе
 * @param {string} section Название раздела
 */
function renderSection(section) {
    if (ELEMENTS[section]) {
        renderList(ELEMENTS[section], LOADED_DATA[section], TEMPLATES[section]);
    } else {
        AFTER_PAGE_LOADED_CALLBACKS.push(() => {
            renderList(renderList(ELEMENTS[section], LOADED_DATA[section], TEMPLATES[section]));
        });
    }
}

/**
 * Инициализация при построении страницы. 
 * Здесь происходит сохранение основных элементов страницы для дальнейших манипуляций с DOM.
 */
export function afterLoadPage() {
    for (let elem in ELEMENTS_ID) {
        console.log(elem);
        ELEMENTS[elem] = document.getElementById(ELEMENTS_ID[elem]);
    }
    AFTER_PAGE_LOADED_CALLBACKS.forEach(callback => callback());
    setMode('popular');
    console.log('afterLoadPage');

    ELEMENTS.searchButton.onclick = search;
    ELEMENTS.searchInput.onkeydown = (event) => {
        if (event.code === 'Enter') {
            search();
        }
    };
}

/**
 * Начало поиска.
 */
function search() {
    const searchValue = ELEMENTS.searchInput.value;
    if (searchValue) {
        ELEMENTS.searchSection.querySelector('.section-caption').innerText = `Результаты поиска для "${searchValue}"`
        prepareSearch(searchValue);
        setMode('search');
    } else {
        prepareTop();
        setMode('top');
    }
}

/**
 * Устанавливает текущий режим, скрывая и показывая разделы.
 * @param {string} mode 
 */
function setMode(mode) {
    currentMode = mode;
    if (currentMode === 'search') {
        ELEMENTS.searchSection.classList.remove('hidden');
        ELEMENTS.topSection.classList.add('hidden');
    } else {
        ELEMENTS.searchSection.classList.add('hidden');
        ELEMENTS.topSection.classList.remove('hidden');
    }
}

/**
 * Вызывает загрузку данных по поисковой строке и отображает их по готовности.
 * @param {string} searchString поисковая строка
 */
async function prepareSearch(searchString) {
    try {
        const searchArtists = await loadData({
            searchString,
            dataType: 'artists'
        });
        LOADED_DATA.searchArtists = (await searchArtists.json()).results.artistmatches.artist;
        renderSection('searchArtists');
        console.log(LOADED_DATA.searchArtists);
    } catch(error) {
        console.error(error.message);
    }

    try {
        const searchAlbums = await loadData({
            searchString,
            dataType: 'albums'
        });
        LOADED_DATA.searchAlbums = (await searchAlbums.json()).results.albummatches.album;
        renderSection('searchAlbums');
        console.log(LOADED_DATA.searchAlbums);
    } catch(error) {
        console.error(error.message);
    }

    try {
        const searchTracks = await loadData({
            searchString,
            dataType: 'tracks'
        });
        LOADED_DATA.searchTracks = (await searchTracks.json()).results.trackmatches.track;
        renderSection('searchTracks');
        console.log(LOADED_DATA.searchTracks);
    } catch(error) {
        console.error(error.message);
    }
}

/**
 * Вызывает загрузку данных о популярных треках и исполнителях и отображает их по готовности.
 */
async function prepareTop() {
    try {
        const topArtists = await loadData({
            dataType: 'artists'
        });
        LOADED_DATA.topArtists = (await topArtists.json()).artists.artist;
        renderSection('topArtists');
        console.log(LOADED_DATA.topArtists);
    } catch(error) {
        console.error(error.message);
    }

    try {
        const popularTracks = await loadData({
            dataType: 'tracks'
        });
        LOADED_DATA.popularTracks = (await popularTracks.json()).tracks.track;
        renderSection('popularTracks');
        console.log(LOADED_DATA.popularTracks);
    } catch(error) {
        console.error(error.message);
    }
}