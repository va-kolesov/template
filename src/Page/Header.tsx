import * as React from 'react';
interface HeaderProps {
    onSearch: Function;
}
 
const Header: React.FunctionComponent<HeaderProps> = ({onSearch}: HeaderProps) => {
    const [searchValue, setSearchValue] = React.useState('');
    return ( 
        <div className="page-header full-width">
            <a href="https://www.last.fm" className="page-header-logo">Last.fm</a>
            <div className="page-header-search">
            <svg onClick={() => {onSearch?.(searchValue)}} xmlns="http://www.w3.org/2000/svg" className="search-icon" viewBox="0 0 12 12">
                <path d="m11 10-2-2a5 5 90 10-1 1l2 2a.5.5 90 001-1zm-6-9a4 4 0 010 8 4 4 0 010-8z"/>
            </svg>
            <input
                className="page-header-search-input"
                placeholder="Поиск музыки..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchValue(event.target.value);
                }}
                onKeyDown={
                    (event) => {
                        if (event.code === 'Enter') {
                            onSearch?.(searchValue);
                        }
                    }
                }
                value={searchValue}/>
            </div>
        </div>
     );
}
 
export default Header;