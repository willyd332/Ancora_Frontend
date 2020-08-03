import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {default as theme} from './custom-theme.json';

// Components
import HomeView from './components/HomeView/HomeView';
import AccountView from './components/AccountView/AccountView';
import StudyIndex from './components/StudyView/StudyIndex';
import StudyView from './components/StudyView/StudyShow';
import SettingsView from './components/SettingsView/SettingsView';
import AuthView from './components/AuthView/AuthView';
import MyWeb from './components/StudyView/WebBox';

const Study = {
  screen: StudyIndex,
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#385399',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
  },
};

const StudyShow = {
  screen: StudyView,
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#385399',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
  },
};

const Web = {
  screen: MyWeb,
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#385399',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
  },
};

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeView,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#385399',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#ffffff',
        },
      },
    },
    Study,
    StudyShow,
    Web,
  },
  {
    initialRouteName: 'Home',
  },
);

const AccountNavigator = createStackNavigator(
  {
    Account: {
      screen: AccountView,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#385399',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#ffffff',
        },
      },
    },
    Study,
    StudyShow,
  },
  {
    initialRouteName: 'Account',
  },
);

const SettingsNavigator = createStackNavigator(
  {
    Settings: {
      screen: SettingsView,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#385399',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#ffffff',
        },
      },
    },
  },
  {
    initialRouteName: 'Settings',
  },
);

const MainNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name="search" size={30} color={tintColor} />
        ),
      },
    },

    Account: {
      screen: AccountNavigator,
      navigationOptions: {
        title: 'Account',
        tabBarIcon: ({tintColor}) => (
          <Icon name="medkit" size={30} color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: SettingsNavigator,
      navigationOptions: {
        title: 'Settings',
        tabBarIcon: ({tintColor}) => (
          <Icon name="cogs" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#ed1b24',
      inactiveTintColor: 'white',
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: '#385399',
      },
      iconStyle: {
        backgroundColor: 'black',
        padding: 100,
      },
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
    return (
      <ApplicationProvider {...eva} theme={{...eva.light}}>
        <AppContainer />
      </ApplicationProvider>
    );
  }
}

AppRegistry.registerComponent('myApp', () => myApp);
