import React, {Component} from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator, createBottomTabNavigator, DrawerActions} from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";
import Home from './screens/Home';
import FilmDetail from './screens/FilmDetail';
import { NavigationActions } from 'react-navigation';
import TvTrend from './screens/TvTrend';
import Info from './screens/Info';
import Profile from './screens/Profile';

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

const TabNavigator = createBottomTabNavigator({
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: ({navigation}) => ({
      title: 'Details',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-list" size={20}/>
      )
    })
  },
  Videos: {
    screen: Profile,
    navigationOptions: ({navigation}) => ({
      title: 'Videos',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-play" size={20}/>
      )
    })
  },
});


const Routes = createAppContainer(
  createStackNavigator({
    DrawerNavigator: DrawerNavigator,
    Home: Home,
    TabNavigator: TabNavigator
  })
);

export default Routes;