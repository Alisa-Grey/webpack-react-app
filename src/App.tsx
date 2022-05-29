import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Loans from './pages/Loans';
import History from './pages/History';
import NotFound from './pages/NotFound';

const App: FC = () => {
  const routes = [
    {
      path: '/',
      element: <Profile />,
    },
    {
      path: '/customer/profile',
      element: <Profile />,
    },
    {
      path: '/customer/loans',
      element: <Loans />,
    },
    {
      path: '/customer/history',
      element: <History />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
