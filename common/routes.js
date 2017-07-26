import App from './containers/App';
import Home from './components/Home';
import Counter from './components/Counter';
import Users from './components/Users';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/counter',
        component: Counter
      },
      {
        path: '/users',
        component: Users
      }
    ]
  }
];

export default routes;
