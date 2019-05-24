import React, {Component} from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator, createBottomTabNavigator, DrawerActions} from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";
import Home from './screens/Home';
import FilmDetail from './screens/FilmDetail';
import { NavigationActions } from 'react-navigation';
import TvTrend from './screens/TvTrend';
import PeopleDetail from './screens/PeopleDetail';

const MenuButton = (props) => {
  if(!props.navigation.state.isDrawerOpen){
    return(
      <Icon
        name={"md-menu"}
        color="#000"
        size={35}
        style={{marginLeft: 10}}
        onPress={() =>  {props.navigation.dispatch(DrawerActions.openDrawer())}}
      >
      </Icon>
    )
  }else{
    return(
      <Icon
        name={"md-close"}
        color="#000"
        size={35}
        style={{marginLeft: 10}}
        onPress={() =>  {props.navigation.dispatch(DrawerActions.closeDrawer())}}
      >
      </Icon>
    )
  }
  
}

const DrawerNavigator = createDrawerNavigator({
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        title: 'Cinema Tred',
      })
    },
    TVTrends: {
      screen: TvTrend,
      navigationOptions: ({navigation}) => ({
        title: 'TV Tred',
      })
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft : <MenuButton navigation={navigation} />,
    }),
  } 
);


const Routes = createAppContainer(
  createStackNavigator({
    DrawerNavigator: DrawerNavigator,
    Home: Home,
    FilmDetail: FilmDetail,
    PeopleDetail: PeopleDetail,
  })
);

export default Routes;