const LIST_CONTENT_SELECTOR = '.list-content'
const IMAGE_FALLBACK = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

/**
 * Рендер данных о треке в виде плитки
 * @param {string} caption 
 * @param {string} duration
 * @param {object} artist 
 * @param {string} url
 * @param {Array[object]} image 
 * @returns 
 */
export function renderTrackTileItem({
    name = '',
    url = '',
    artist = {},
    duration = '',
    image = []
}) {
    const html = `
    <div class="tile-item-horizontal">
        <img class="tile-item-horizontal-image" src="${image[3]['#text'] || IMAGE_FALLBACK} alt="${name}"/>
        <div class="tile-item-horizontal-text">
            <a class="text-primary font-size_m tile-item-line" href="${url}" title="${name}">${name}</a>
            <a class="text-secondary tile-item-line" href="${artist.url}" title="${artist.name}">${artist.name}</a>
            <div class="text-unaccented font-size_s tile-item-line" title="${duration} длительность">${duration}</div>
        </div>
    </div>`;
    return stringToHTML(html);
}

/**
 * Рендер данных о треке в виде строки списка
 * @param {string} caption
 * @param {string} url
 * @param {string} artist
 * @param {string} duration
 * @param {Array<object>} image
 * @returns 
 */
export function renderTrackListItem({
    name = '',
    url = '',
    artist = '',
    listeners = '',
    image = []
}) {
    const html = `
        <div class="list-item">
            <img class="list-item-column list-item-image" src="${image[3]['#text'] || IMAGE_FALLBACK}" alt="${name}"/>
            <a class="list-item-column text-primary font-size_m" href="${url}" title="${name}">${name}</a>
            <div class="list-item-column font-size_m text-secondary" title="${artist}">${artist}</div>
            <div class="list-item-column font-size_m text-unaccented" title="${listeners} слушателей">${listeners}</div>
        </div>`;
    return stringToHTML(html);
}

/**
 * Рендер данных об исполнителе в виде плитки
 * @param {string} caption
 * @param {string} description
 * @param {string} url
 * @param {Array<object>} image
 */
export function renderArtistTileItem({
    name = '',
    listeners = '',
    url = '',
    image = []
}) {
    const html = `
        <div class="tile-item-vertical">
            <img class="tile-item-vertical-image image-round" src="${image[3]['#text'] || IMAGE_FALLBACK}" alt="${name}"/>
            <a class="text-primary font-size_m tile-item-line" href="${url}" title="${name}">${name}</a>
            <div class="text-unaccented font-size_s tile-item-line text-ellipsis text-ellipsis" title="${listeners} слушателей">${listeners}</div>
        </div>`;
    return stringToHTML(html);
}

/**
 * Рендерит данные в виде блока
 * @param {string} caption 
 * @param {string} description 
 * @param {string} url 
 * @param {string} img 
 * @returns 
 */
export function renderBlock(
    caption = '',
    description = '',
    url = '',
    img = ''
) {
    const html = `
        <div class="blocks-item">
            <img class="blocks-item-image" src="${img || IMAGE_FALLBACK}" alt="${caption}"/>
            <div class="blocks-item-text-wrapper">
                <a class="blocks-item-text text-primary-contrast font-size_m" href="${url}" title="${caption}">${caption}</a>
                <div class="blocks-item-text font-size_s text-contrast" title="${description}">${description}</div>
            </div>
        </div>`;
    return stringToHTML(html);
}

/**
 * Рендер данных об исполнителе в виде блока
 * @param {string} caption
 * @param {string} description
 * @param {string} url
 * @param {Array<object>} image
 */
 export function renderBlockArtistItem({
    name = '',
    listeners = '',
    url = '',
    image = []
}) {
    return renderBlock(
        name,
        listeners,
        url,
        image[3]?.['#text']
    )
}

/**
 * Рендер данных об альбоме в виде блока
 * @param {string} caption 
 * @param {string} description 
 * @param {string} url 
 * @param {string} img 
 */
export function renderBlockAlbumItem({
    name = '',
    artist = '',
    url = '',
    image = []
}) {
    return renderBlock(
        name,
        artist,
        url,
        image[3]?.['#text']
    )
}

/**
 * Рендерит данные в виде списка в указанном элементе, используя переданный шаблон.
 * @param {HTMLElement} sectionElement 
 * @param {Array<object>} data 
 * @param {Function} template 
 */
 export function renderList(sectionElement, data, template) {
    const element = sectionElement.querySelector(LIST_CONTENT_SELECTOR);
    element.innerHTML = '';
    const listElements = data.map((dataElement) => {
        return template(dataElement);
    });
    element.append(...listElements);
}

/**
 * Создает элементы по html-строке.
 * @param {string} htmlString 
 * @returns HTMLElement
 */
function stringToHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}