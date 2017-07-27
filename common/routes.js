import App from './containers/App';
import Home from './components/Home';
import Counter from './components/Counter';
import Users from './components/Users';
import { fetchUsers } from './actions/users';

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
        component: Counter,
      },
      {
        path: '/users',
        component: Users,
        fetchData: (dispatch) => Promise.all([
          dispatch(fetchUsers())
        ]),
      }
    ]
  }
];

export default routes;
