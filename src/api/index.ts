import {TeamOverview, Teams, UserData} from 'types';

const getData = async (path = '') => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/${path}`;
    const res = await fetch(url);
    return res.json();
};

export const getTeams = (): Promise<Teams[]> => {
    return getData('teams');
};

export const getTeamOverview = (teamId: string): Promise<TeamOverview> => {
    return getData(`teams/${teamId}`);
};

export const getUserData = (userId: string): Promise<UserData> => {
    return getData(`users/${userId}`);
};
