import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './screens/Home';
import FilmDetail from './screens/FilmDetail';

const Routes = createAppContainer(
  createStackNavigator({
    Home: Home,
    FilmDetail: FilmDetail,
  })
);

export default Routes;