import * as React from 'react';
import {ListItem, Teams as TeamsList} from 'types';
import {getTeams as fetchTeams} from '../api';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';
import {SearchInput} from '../components/SearchInput';

const getTeamsList = ( teams: TeamsList[]) => {
    return teams.map(team => {
        const columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        } as ListItem;
    });
};

const Teams = () => {
    const [teams, setTeams] = React.useState<any>([]);
    const [filteredTeams, setFilteredTeams] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState<any>(true);

    React.useEffect(() => {
        // switch spinner with data
        fetchTeams().then(response => {
            setTeams(response as TeamsList[]);
            setFilteredTeams(response as TeamsList[]);
            setIsLoading(false);
        });

    }, []);

    const filterTeams = (event) => {
        const query = event.target.value;
        const filtered = teams.filter((item) => {
            const searchKey = item.name;
            return searchKey.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        }) as TeamsList[];
        setFilteredTeams(filtered);
    };
    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <SearchInput onChangeHandler={filterTeams}/>
            <List items={getTeamsList(filteredTeams)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
