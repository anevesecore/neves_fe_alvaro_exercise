import * as React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Teams from './pages/Teams';
import TeamOverview from './pages/TeamOverview';
import UserOverview from './pages/UserOverview';

const App: React.FC = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Teams />,
        },
        {
            path: '/team/:teamId',
            element: <TeamOverview />,
        },
        {
            path: '/user/:useId',
            element: <UserOverview />,
        },
    ]);
    return <RouterProvider router={router} />;
};

export default App;
