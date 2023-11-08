import * as React from 'react';
import {ChangeEventHandler} from 'react';
import {InputItem} from './styles';

// eslint-disable-next-line @typescript-eslint/ban-types
interface Props{
    // eslint-disable-next-line @typescript-eslint/ban-types
    onChangeHandler: ChangeEventHandler;
}

export const SearchInput = (props: Props) => {
    return <InputItem data-testid='searchInputBox'>
        <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor='searchInputId'>Search:</label>
            <input id='searchInputId' data-testid='searchInput' type='search' placeholder='Type something to search' onChange={props.onChangeHandler} autoFocus autoComplete='off'/>
        </div>
    </InputItem>;
};
