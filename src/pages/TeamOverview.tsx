import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import {getTeamOverview, getUserData} from '../api';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';
import {SearchInput} from '../components/SearchInput';

const getUsersData = (users: UserData[]) => {
    return users.map(u => {
        const columns = [
            {
                key: 'Name',
                value: `${u.firstName} ${u.lastName}`,
            },
            {
                key: 'Display Name',
                value: u.displayName,
            },
            {
                key: 'Location',
                value: u.location,
            },
        ];
        return {
            id: u.id,
            url: `/user/${u.id}`,
            columns,
            navigationProps: u,
        };
    }) as ListItem[];
};

const getLead = tlead => {
    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${tlead.firstName} ${tlead.lastName}`,
        },
        {
            key: 'Display Name',
            value: tlead.displayName,
        },
        {
            key: 'Location',
            value: tlead.location,
        },
    ];
    return <Card columns={columns} url={`/user/${tlead.id}`} navigationProps={tlead}/>;
};

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const [pageData, setPageData] = React.useState<PageState>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [filteredTeamMembers, setFilteredTeamMembers] = React.useState<any>([]);

    React.useEffect(() => {
        const getTeamUsers = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const teamLead = await getUserData(teamLeadId);

            const teamMembers = [];
            for(const teamMemberId of teamMemberIds) {
                const data = getUserData(teamMemberId);
                teamMembers.push(data);
            }

            await Promise.all(teamMembers).then((r) => {
                setPageData({
                    teamLead,
                    teamMembers: r,
                });
                setFilteredTeamMembers(r);
            });
        };
        getTeamUsers().then(() => {
            setIsLoading(false);
        });
    }, [teamId]);

    const filterUsers = (event) => {
        // Access input value
        const query = event.target.value;
        // Include all elements which includes the search query
        const teamMembers: UserData[] = pageData.teamMembers;
        const filtered = teamMembers.filter((item) => {
            const searchKey = item.displayName;
            return searchKey.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        // Trigger render with updated values
        setFilteredTeamMembers(filtered);
    };

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {!isLoading && getLead(pageData.teamLead)}
            {!isLoading && <SearchInput onChangeHandler={filterUsers} />}
            <List items={getUsersData(filteredTeamMembers ?? [])} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
