import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Loans from './pages/Loans';
import NotFound from './pages/NotFound';
import Layout from './pages/Layout';
import Header from './components/header';

export const client = {
  id: 1,
  first_name: 'Anna',
  last_name: 'Addams',
  date_of_birth: '1994-03-16T11:46:09.000Z',
  phone_number: '(904) 444-4444',
  address: '450 Lakeville Rd, Lake Success, NY 11042, USA',
};

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
      path: '*',
      element: <NotFound />,
    },
  ];

  const render = (el: JSX.Element) => {
    return <Layout header={<Header data={client} />}>{el}</Layout>;
  };

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={render(route.element)}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
