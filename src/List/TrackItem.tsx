import * as React from 'react';

const IMAGE_FALLBACK = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

interface TrackListItemProps {
    caption: string;
    description: string;
    artist: string;
    url: string;
    img: string;
}
 
const TrackItem: React.FunctionComponent<TrackListItemProps> = ({
    caption = '',
    description = '',
    artist = '',
    url = '',
    img = ''
}) => {
    return (
        <div className="list-item">
            <img className="list-item-column list-item-image" src={img || IMAGE_FALLBACK} alt={caption}/>
            <a className="list-item-column text-primary font-size_m" href={url} title={caption}>{caption}</a>
            <div className="list-item-column font-size_m text-secondary" title={artist}>{artist}</div>
            <div className="list-item-column font-size_m text-unaccented" >{description}</div>
        </div>
    );
}
 
export default TrackItem;
