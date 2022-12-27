import * as React from 'react';

const IMAGE_FALLBACK = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

interface ArtistTileProps {
    name: string;
    description: string;
    url: string;
    img: string;
}
 
const ArtistTile: React.FunctionComponent<ArtistTileProps> = ({
    name = '',
    description = '',
    url = '',
    img = ''
}) => {
    return (
        <div className="tile-item-vertical">
            <img className="tile-item-vertical-image image-round" src={img || IMAGE_FALLBACK} alt={name}/>
            <a className="text-primary font-size_m tile-item-line" href={url} title={name}>{name}</a>
            <div className="text-unaccented font-size_s tile-item-line text-ellipsis text-ellipsis">{description}</div>
        </div>
    );
}
 
export default ArtistTile;
