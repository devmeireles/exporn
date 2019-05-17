import { createDrawerNavigator } from 'react-navigation'; 
import { HomeScreen } from '../src/screens/Home';
import { InfoScreen } from '../src/screens/Info';
import { ProfileScreen } from '../src/screens/Profile';

export default createDrawerNavigator (
    {
      Home:{
        screen:HomeScreen
      },
      Info:{
        screen:InfoScreen
      },
      Profile:{
          screen:ProfileScreen
      }
    },{
        initialRouteName:'Home'
    }
)
