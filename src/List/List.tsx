import * as React from 'react';
import './List.css';

interface ListProps<T extends Object> {
    data: T[] | null;
    template: React.FunctionComponent<T>;
    className?: string;
}
type TList<T extends Object> = React.FunctionComponent<ListProps<T>>;

function List<T extends Object>(props: ListProps<T>): React.ReactElement<any, any> | null{
    if (!props.data) {
        return null;
    }
    return ( 
        <div className={props.className + " blocks fullWidth list-content"}>
            {props.data.map((item, index) => {
                return <props.template {...item} key={index}/>
            })}
        </div>
    );
}
 
export default List;

