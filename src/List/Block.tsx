import * as React from 'react';

const IMAGE_FALLBACK = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

interface BlockProps {
    caption: string;
    description: string;
    url: string;
    img: string;
}
 
const Block: React.FunctionComponent<BlockProps> = ({
    caption = '',
    description = '',
    url = '',
    img = ''
}) => {
    return (
    <div className="blocks-item">
        <img className="blocks-item-image" src={img || IMAGE_FALLBACK} alt={caption}/>
        <div className="blocks-item-text-wrapper">
            <a className="blocks-item-text text-primary-contrast font-size_m" href={url} title={caption}>{caption}</a>
            <div className="blocks-item-text font-size_s text-contrast" title={description}>{description}</div>
        </div>
    </div>
    );
}
 
export default Block;
