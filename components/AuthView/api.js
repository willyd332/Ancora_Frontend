import AsyncStorage from '@react-native-community/async-storage';
import {BACKEND_URL} from 'react-native-dotenv';

const login = async (state, setState, navigate) => {
  if (state.username.length > 0 && state.password.length > 0) {
    try {
      const user = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'post',
        body: JSON.stringify({
          username: state.username.toLowerCase(),
          password: state.password,
          id: '',
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (user) {
        const userJSON = await user.json();
        if (userJSON.status === '500' || !userJSON.data) {
          setState({logError: 'User Not Found'});
        } else {
          await AsyncStorage.setItem('username', userJSON.data.username);
          await AsyncStorage.setItem('userId', userJSON.data._id);
          const storedUsername = await AsyncStorage.getItem('username');
          const storedId = await AsyncStorage.getItem('userId');
          const storedData = {
            username: storedUsername,
            id: storedId,
          };
          navigate(storedData);
        }
      } else {
        setState({logError: 'User Not Found'});
      }
    } catch (err) {
      console.error(`Login Failed!!! ${err}`);
      throw err;
    }
  }
};

const register = async (state, setState, navigate) => {
  if (
    state.username.length > 0 &&
    state.password.length > 0 &&
    state.password === state.passwordConfirm &&
    state.email.length > 0
  ) {
    try {
      const registeredUser = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'post',
        body: JSON.stringify({
          username: state.username.toLowerCase(),
          password: state.password,
          email: state.email,
          id: '',
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (registeredUser) {
        const registeredUserJSON = await registeredUser.json();
        if (registeredUserJSON.status === '500' || !registeredUserJSON.data) {
          setState({regError: 'User Already Exists'});
        } else {
          console.log(registeredUserJSON);
          await AsyncStorage.setItem(
            'username',
            registeredUserJSON.data.username,
          );
          await AsyncStorage.setItem(
            'userId',
            registeredUserJSON.data.id.toString(),
          );
          const storedUsername = await AsyncStorage.getItem('username');
          const storedId = await AsyncStorage.getItem('userId');
          const storedData = {
            username: storedUsername,
            id: storedId,
          };
          navigate(storedData);
        }
      } else {
        setState({regError: 'User Already Exists'});
      }
    } catch (err) {
      console.error(`Register Failed!!! ${err}`);
    }
  } else {
    setState({regError: 'Please Correct Errors'});
  }
};

const checkForUser = async (state, setState, navigate) => {
  try {
    const storedUsername = await AsyncStorage.getItem('username');
    const storedId = await AsyncStorage.getItem('userId');
    const storedData = {
      username: storedUsername,
      id: storedId,
    };
    if (storedData.username && storedData.id) {
      const user = await fetch(`${BACKEND_URL}/auth/session`, {
        method: 'post',
        body: JSON.stringify({
          username: storedData.username.toLowerCase(),
          password: '',
          id: storedData.id,
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (user) {
        const userJSON = await user.json();
        if (userJSON.data) {
          navigate(storedData);
        }
      }
    }
  } catch (err) {
    console.error(`Checking For User Failed!!! ${err}`);
  }
};

export {login, register, checkForUser};
