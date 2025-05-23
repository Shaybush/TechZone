import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/Home'));
const BasketPage = lazy(() => import('./pages/Basket'));
const User = lazy(() => {
  console.log("user page loaded");
  return import('./pages/User')
});

export const routes = [
  {
    to: '/',
    text: 'Home',
    activeNames: ['/home', '/'],
    Component: HomePage,
  },
  {
    to: '/basket',
    text: 'Basket',
    activeNames: ['/basket'],
    Component: BasketPage,
  },
  {
    to: '/users',
    text: 'Users',
    activeNames: ['/users'],
    Component: User,
  },
];
