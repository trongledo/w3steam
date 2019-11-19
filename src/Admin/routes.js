import React from 'react';

const Projects = React.lazy(() => import('./views/Projects/Projects'));
const MenuList = React.lazy(() => import('./views/MenuList/MenuList.js'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/admin', exact: true, name: 'Home' },
  {
    path: '/admin/projects',
    exact: true,
    name: 'Projects',
    component: Projects
  },
  {
    path: '/admin/menu-list',
    exact: true,
    name: 'Menu List',
    component: MenuList
  }
];

export default routes;
