import * as React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import * as API from '../../api';
import TeamOverview from '../TeamOverview';
import {UserData, TeamOverview as Team} from '../../types';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            teamName: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

describe('TeamOverview', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render team overview users', async () => {
        const teamOverview: Team  = {
            id: '1',
            teamLeadId: '2',
            teamMemberIds: ['3', '4', '5'],
        };
        const userData: UserData = {
            id: '2',
            firstName: 'user-name',
            lastName: 'user-lastName',
            displayName: 'user-dispalyName',
            location: '',
            avatarUrl:'',
        };
        jest.spyOn(API, 'getTeamOverview').mockResolvedValue(teamOverview);
        jest.spyOn(API, 'getUserData').mockResolvedValue(userData);

        render(<TeamOverview />);
        await waitFor(() => {
            expect(screen.queryAllByTestId(`cardContainer-${userData.id}`)).toHaveLength(3);
        });

        await waitFor(() => {
            expect(screen.queryAllByTestId('searchInputBox')).toHaveLength(1);
        });

        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            fireEvent.change(screen.getByTestId('searchInput'), {target: {value: 'user'}});
            expect(screen.queryAllByTestId('noItemsMessage')).toHaveLength(0);
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.queryAllByTestId(`cardContainer-${userData.id}`)).toHaveLength(3);
        });
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            fireEvent.change(screen.getByTestId('searchInput'), {target: {value: 'invalidName'}});
            expect(screen.queryAllByTestId('noItemsMessage')).toHaveLength(1);
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.queryAllByTestId(`cardContainer-${userData.id}`)).toHaveLength(0);
        });

    });
});
