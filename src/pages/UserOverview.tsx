import * as React from 'react';
import {useLocation} from 'react-router-dom';
import {UserData} from 'types';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';

const makeCards = (user: UserData) => {
    const columns = [
        {
            key: 'Name',
            value: `${user.firstName} ${user.lastName}`,
        },
        {
            key: 'Display Name',
            value: user.displayName,
        },
        {
            key: 'Location',
            value: user.location,
        },
    ];
    return <Card columns={columns} hasNavigation={false} navigationProps={user} />;
};

const UserOverview = () => {
    const location = useLocation();
    const userData: UserData = location.state;
    return (
        <Container>
            <Header
                title={`User ${userData.firstName} ${userData.lastName}`}
            />
            <img src={userData.avatarUrl} alt={`${userData.firstName}'s avatar`} />
            {makeCards(userData)}
        </Container>
    );
};

export default UserOverview;
