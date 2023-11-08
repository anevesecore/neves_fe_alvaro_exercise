import React from 'react';
import {render, screen} from '@testing-library/react';
import {SearchInput} from '..';

const mockedOnChange = jest.fn();

describe('SearchInput', () => {
    it('should render input', () => {
        render(<SearchInput onChangeHandler={mockedOnChange}/>);

        expect(screen.getByText('Search:')).toBeInTheDocument();
        expect(screen.getByTestId('searchInputBox')).toBeInTheDocument();
    });
});
