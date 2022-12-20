const URL = 'https://ws.audioscrobbler.com/2.0/';
const API_KEY = '6bad8919ce9f1b1dc9353ba4f9c4b38c';
const METHODS = {
    topArtists: 'chart.getTopArtists',
    topTracks: 'chart.getTopTracks',
    searchArtists: 'artist.search',
    searchAlbums: 'album.search',
    searchTracks: 'track.search'
}

/**
 * Функция, загружающая данные
 * @param {string} dataType тип данных (artists/tracks)
 * @param {number} limit количество запрашиваемых данных
 * @param {number} page страница
 * @param {string} searchString поисковая строка
 * @returns Promise
 */
export async function loadData({dataType, limit, page, searchString}) {
    if (searchString) {
        return search({dataType, limit, page, searchString});
    } else {
        return loadTop({dataType});
    }
}

/**
 * Функция, загружающая данные по поисковому запросу
 * @param {string} dataType тип данных (artists/tracks)
 * @param {number} limit количество запрашиваемых данных
 * @param {number} page страница
 * @param {string} searchString поисковая строка
 * @returns Promise
 */
export async function search({dataType, limit, page, searchString}) {
    switch (dataType) {
        case 'artists': {
            return fetchData(`${METHODS.searchArtists}`, limit, page, `&artist=${searchString}`);
        }
        case 'albums': {
            return fetchData(`${METHODS.searchAlbums}`, limit, page, `&album=${searchString}`);
        }
        case 'tracks': {
            return fetchData(`${METHODS.searchTracks}`, limit, page, `&track=${searchString}`);
        }
    }
}

/**
 * Функция, загружающая данные о популярных треках или исполнителях
 * @param {string} dataType тип данных (artists/tracks)
 * @returns Promise
 */
export async function loadTop({dataType}) {
    switch (dataType) {
        case 'artists': {
            return fetchData(METHODS.topArtists, 12)
        };
        case 'tracks': {
            return fetchData(METHODS.topTracks, 12)
        }
    }
}

/**
 * Точка запроса к API
 * @param {string} method метод для вызова
 * @param {number} limit количество запрашиваемых данных
 * @param {number} page страница
 * @param {string} additionalParams дополнительные параметры для запроса
 * @returns 
 */
async function fetchData(method, limit = 8, page = 1, additionalParams = '') {
    return fetch(`${URL}?method=${method}${additionalParams}&limit=${limit}&page=${page}&api_key=${API_KEY}&format=json`);
}