import React from 'react';
import { Navigate } from 'react-router-dom';
import HomeLayout from 'src/layouts/HomeLayout';
import MissedLayout from 'src/layouts/MissedLayout';
import HomeView from 'src/views/home';
import DetailsView from 'src/views/details'
import NotFoundView from 'src/views/errors/NotFoundView';

const Routes = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { path: '/', element: <HomeView /> },
      { path: '/details/:id', element: <DetailsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MissedLayout />,
    children: [{ path: '404', element: <NotFoundView /> }]
  }
];

export default Routes;
