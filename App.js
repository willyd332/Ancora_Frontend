import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import HomeView from './components/HomeView/HomeView';
import AccountView from './components/AccountView/AccountView';
import StudyView from './components/StudyView/StudyView';
import SettingsView from './components/SettingsView/SettingsView';
import AuthView from './components/AuthView/AuthView';

const HomeNavigator = createStackNavigator({
  HomeView: {
    screen: HomeView,
  },
  StudyView: {
    // When you click a study: onPress={() => this.props.navigation.navigate('ConnectionView' .....
    screen: StudyView,
  },
});

const AccountNavigator = createStackNavigator({
  Account: {
    screen: AccountView,
  },
  Study: {
    // When you click a study: onPress={() => navigate('StudyView' .....
    screen: StudyView,
  },
});

const MainNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: '',
        tabBarIcon: () => <Icon name="search" size={30} color="#900" />,
      },
    },

    Account: {
      screen: AccountNavigator,
      navigationOptions: {
        title: '',
        tabBarIcon: () => <Icon name="medkit" size={30} color="#900" />,
      },
    },
    Settings: {
      screen: SettingsView,
      navigationOptions: {
        title: '',
        tabBarIcon: () => <Icon name="cogs" size={30} color="#900" />,
      },
    },
  },
  {
    style: {backgroundColor: '#23408e'},
    activeBackgroundColor: '#23408e',
    tabBarOptions: {
      inactiveTintColor: '#b5b5b5',
      showIcon: true,
    },
  },
);

const AppNavigator = createSwitchNavigator({
  AuthView,
  Home: MainNavigator,
});

const AppContainer = createAppContainer(AppNavigator);

export default class myApp extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <AppContainer />;
  }
}

AppRegistry.registerComponent('myApp', () => myApp);
