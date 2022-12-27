import * as React from 'react';

const IMAGE_FALLBACK = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

interface TrackTileProps {
    caption: string;
    description: string;
    artist: {name: string, url: string};
    url: string;
    img: string;
}
 
const TrackTile: React.FunctionComponent<TrackTileProps> = ({
    caption = '',
    description = '',
    artist = {name: '', url: ''},
    url = '',
    img = ''
}) => {
    return (
        <div className="tile-item-horizontal">
            <img className="tile-item-horizontal-image" src={img || IMAGE_FALLBACK} alt={caption}/>
            <div className="tile-item-horizontal-text">
                <a className="text-primary font-size_m tile-item-line" href={url} title={caption}>{caption}</a>
                <a className="text-secondary tile-item-line" href={artist.url} title={artist.name}>{artist.name}</a>
                <div className="text-unaccented font-size_s tile-item-line">{description}</div>
            </div>
        </div>
    );
}
 
export default TrackTile;
