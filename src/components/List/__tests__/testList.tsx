import React from 'react';
import {render, screen} from '@testing-library/react';
import List from '..';

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => jest.fn(),
}));

describe('List', () => {
    it('should render spinner and not render items when it is loading', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
        ];
        render(<List isLoading items={items} />);

        expect(screen.queryByText('There are no items to show')).not.toBeInTheDocument();
        expect(screen.queryByTestId('cardContainer')).not.toBeInTheDocument();
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('should not render spinner and render items when it is not loading', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
        ];
        render(<List isLoading={false} items={items} />);

        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(screen.queryByText('There are no items to show')).not.toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-1')).toBeInTheDocument();
    });

    it('should not render the spinner and the items but a message', () => {
        const items = [];
        render(<List isLoading={false} items={items} />);

        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(screen.queryByTestId('cardContainer-1')).not.toBeInTheDocument();
        expect(screen.getByText('There are no items to show')).toBeInTheDocument();
    });

    it('should render multiple card when multiple items', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
            {
                id: '2',
                columns: [
                    {
                        key: 'columnKey2',
                        value: 'columnValue2',
                    },
                ],
            },
        ];
        render(<List isLoading={false} items={items} />);

        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(screen.queryByText('There are no items to show')).not.toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-1')).toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-2')).toBeInTheDocument();
    });
});
