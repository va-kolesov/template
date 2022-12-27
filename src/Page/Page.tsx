import React, { PropsWithChildren } from 'react';
import ArtistTile from '../List/ArtistTile';
import Block from '../List/Block';
import List from '../List/List';
import TrackItem from '../List/TrackItem';
import TrackTile from '../List/TrackTile';
import { loadData } from '../dataLoaders';
import Section from './Section';
import Header from './Header';
import './Page.css';

/**
 * Соответствие отображаемых данных и шаблонов 
 */
const TEMPLATES = {
    searchArtists: React.memo(({name, listeners, url, image}: PropsWithChildren<IArtistData>) => {
        return (
            <Block
                caption={name}
                description={listeners}
                url={url}
                img={image[3]?.['#text']}
            />
        )}),
    searchAlbums: React.memo(({name, artist, url, image}: PropsWithChildren<IAlbumsData>) => {
        return (
            <Block
                caption={name}
                description={artist}
                url={url}
                img={image[3]?.['#text']}
            />
        )}),
    searchTracks: React.memo(({name, artist, listeners, url, image}: PropsWithChildren<ITrackData>) => {
        return (
            <TrackItem
                caption={name}
                description={listeners.toString()}
                artist={artist as string}
                url={url}
                img={image[3]?.['#text']}
            />
        )}),
    topArtists: React.memo(({name, listeners, url, image}: PropsWithChildren<IArtistData>) => {
        return (
            <ArtistTile
                name={name}
                description={listeners}
                url={url}
                img={image[3]?.['#text']}
            />
        )}),
    topTracks: React.memo(({name, artist, listeners, url, image}: PropsWithChildren<ITrackData>) => {
        return (
            <TrackTile
                caption={name}
                description={listeners.toString()}
                artist={artist as {name: string, url: string}}
                url={url}
                img={image[3]?.['#text']}
            />
        )}),
};

interface IPageState {
    currentMode: 'top' | 'search';
    searchString: string;
    searchArtists: IArtistData[] | null;
    searchAlbums: IAlbumsData[] | null;
    searchTracks: ITrackData[] | null;
    topArtists: IArtistData[] | null;
    topTracks: ITrackData[] | null;
}

interface IImage {
    '#text': string;
}

interface IArtistData extends Object {
    name: string;
    listeners: string;
    url: string;
    image: IImage[];
}

interface IAlbumsData extends Object {
    name: string;
    artist: string;
    url: string;
    image: IImage[];
}

interface ITrackData extends Object {
    name: string;
    url: string;
    artist: {name: string, url: string} | string;
    listeners: number;
    image: IImage[];
}

export default class Page extends React.Component<{}, IPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            currentMode: 'top',
            searchString: '',
            searchArtists: null,
            searchAlbums: null,
            searchTracks: null,
            topArtists: null,
            topTracks: null
        }
    }

    componentDidMount(): void {
        this.prepareTop();
    }

    prepareTop() {
        try {
            loadData({dataType: 'artists'})
                .then((response) => response?.json())
                .then((topArtists) => this.setState({topArtists: topArtists.artists.artist}));
        } catch(error) {
            console.error(error);
        }
    
        try {
            loadData({dataType: 'tracks'})
                .then((response) => response?.json())
                .then((topTracks) => this.setState({topTracks: topTracks.tracks.track}));
        } catch(error) {
            console.error(error);
        }
    }

    prepareSearch(searchString: string) {
        try {
            loadData({
                searchString,
                dataType: 'artists'
            })
            .then((response) => response?.json())
            .then((searchArtists) => this.setState({searchArtists: searchArtists.results.artistmatches.artist}));
        } catch(error) {
            console.error(error);
        }

        try {
            loadData({
                searchString,
                dataType: 'albums'
            })
            .then((response) => response?.json())
            .then((searchAlbums) => this.setState({searchAlbums: searchAlbums.results.albummatches.album}));
        } catch(error) {
            console.error(error);
        }

        try {
            loadData({
                searchString,
                dataType: 'tracks'
            })
            .then((response) => response?.json())
            .then((searchTracks) => this.setState({searchTracks: searchTracks.results.trackmatches.track}));
        } catch(error) {
            console.error(error);
        }
    }
    render() {
        return (
            <div className="page-root">
                <Header onSearch={
                    (value: string) => {
                        this.setState({
                            searchString: value,
                            currentMode: value ? 'search' : 'top'
                        });
                        if (value) {
                            this.prepareSearch(value);
                        }
                    }
                }/>
                <div className="page-content">
                    { 
                    this.state.currentMode === 'search' ?
                    <div className="section-wrapper">
                        <div className="section-caption">Результаты поиска для "AJR"</div>
                        <Section caption='Исполнители' level='subsection'>
                            <List<IArtistData>
                                data={this.state.searchArtists}
                                className="blocks"
                                template={TEMPLATES.searchArtists}
                            />
                        </Section>
                        <Section caption='Альбомы' level='subsection'>
                            <List<IAlbumsData>
                                data={this.state.searchAlbums}
                                className="blocks"
                                template={TEMPLATES.searchAlbums}
                            />
                        </Section>
                        <Section caption='Треки' level='subsection'>
                            <List<ITrackData>
                                data={this.state.searchTracks}
                                className="list"
                                template={TEMPLATES.searchTracks}
                            />
                        </Section>
                    </div>
                    : 
                    <div className="section-wrapper" id="top-section">
                        <Section caption='Популярные исполнители' level='section'>
                            <List<IArtistData>
                                data={this.state.topArtists}
                                className="tile placeholder520"
                                template={TEMPLATES.topArtists}
                            />
                        </Section>
                        <Section caption='Популярные треки' level='section'>
                            <List<ITrackData>
                                data={this.state.topTracks}
                                className="tile placeholder400"
                                template={TEMPLATES.topTracks}
                            />
                        </Section>
                    </div>
                    }
                </div>
            </div>
        );
    }

}
