import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import {BACKEND_URL} from 'react-native-dotenv';

export default class AuthView extends Component {
  constructor() {
    super();

    this.state = {
      password: '',
      email: '',
      passwordConfirm: '',
      username: '',
      register: false,
      regError: false,
      logError: false,
    };
  }

  componentDidMount() {
    this.checkForUser();
  }

  login = async () => {
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      try {
        const user = await fetch(`${BACKEND_URL}/auth/login`, {
          method: 'post',
          body: JSON.stringify({
            username: this.state.username.toLowerCase(),
            password: this.state.password,
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
            this.setState({logError: 'User Not Found'});
          } else {
            await AsyncStorage.setItem('username', userJSON.data.username);
            await AsyncStorage.setItem('userId', userJSON.data._id);
            const storedUsername = await AsyncStorage.getItem('username');
            const storedId = await AsyncStorage.getItem('userId');
            const storedData = {
              username: storedUsername,
              id: storedId,
            };
            this.props.navigation.navigate('Home', {userData: storedData});
          }
        } else {
          this.setState({logError: 'User Not Found'});
        }
      } catch (err) {
        console.error(`Login Failed!!! ${err}`);
        throw err;
      }
    }
  };

  register = async () => {
    if (
      this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.passwordConfirm &&
      this.state.email.length > 0
    ) {
      try {
        const registeredUser = await fetch(`${BACKEND_URL}/auth/register`, {
          method: 'post',
          body: JSON.stringify({
            username: this.state.username.toLowerCase(),
            password: this.state.password,
            email: this.state.email,
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
            this.setState({regError: 'User Already Exists'});
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
            this.props.navigation.navigate('Home', {userData: storedData});
          }
        } else {
          this.setState({regError: 'User Already Exists'});
        }
      } catch (err) {
        console.error(`Register Failed!!! ${err}`);
      }
    } else {
      this.setState({regError: 'Please Correct Errors'});
    }
  };

  checkForUser = async () => {
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
            this.props.navigation.navigate('Home', {
              userData: storedData,
            });
          }
        }
      }
    } catch (err) {
      console.error(`Checking For User Failed!!! ${err}`);
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          dismissKeyboard();
        }}>
        <View style={styles.container}>
          {this.state.register ? null : (
            <View style={styles.container}>
              <Image
                source={{
                  uri:
                    'https://i.ya-webdesign.com/images/research-vector-clinical-trial-2.png',
                }}
                style={styles.logo}
              />
              <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({username})}
                placeholder="Username"
                placeholderTextColor="#cccccc"
                style={styles.input}
              />
              <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}
                placeholder="Password"
                placeholderTextColor="#cccccc"
                secureTextEntry
                style={styles.input}
              />
              {this.state.logError ? (
                <Text style={styles.errText}>{this.state.logError}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={(e) => {
                  this.login(e);
                }}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toggle}
                onPress={(e) => {
                  this.setState({
                    register: true,
                    password: '',
                    username: '',
                    passwordConfirm: '',
                  });
                }}>
                <Text style={styles.toggleText}>Create A New Account?</Text>
              </TouchableOpacity>
            </View>
          )}
          {!this.state.register ? null : (
            <View style={styles.container}>
              <Image
                source={{
                  uri:
                    'https://i.ya-webdesign.com/images/research-vector-clinical-trial-2.png',
                }}
                style={styles.logo}
              />

              <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({username})}
                placeholder="Username"
                placeholderTextColor="#cccccc"
                style={styles.input}
              />

              <TextInput
                value={this.state.email}
                onChangeText={(email) => this.setState({email})}
                placeholder="Email"
                placeholderTextColor="#cccccc"
                style={styles.input}
              />

              <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}
                placeholder="Password"
                placeholderTextColor="#cccccc"
                secureTextEntry
                style={styles.input}
              />

              <TextInput
                value={this.state.passwordConfirm}
                onChangeText={(passwordConfirm) =>
                  this.setState({passwordConfirm})
                }
                placeholder="Confirm Password"
                placeholderTextColor="#cccccc"
                secureTextEntry
                style={styles.input}
              />

              {this.state.regError ? (
                <Text style={styles.errText}>{this.state.regError}</Text>
              ) : null}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={(e) => {
                  this.register(e);
                }}>
                <Text style={styles.loginButtonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toggle}
                onPress={(e) => {
                  this.setState({
                    register: false,
                    password: '',
                    username: '',
                    passwordConfirm: '',
                  });
                }}>
                <Text style={styles.toggleText}>Already Have An Account?</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#23408e',
  },

  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 8,
    marginTop: 2,
    color: 'white',
    borderRadius: 6,
    backgroundColor: '#23408e',
  },

  toggleText: {
    width: 200,
    textAlign: 'center',
    borderWidth: 1,
    color: 'white',
    padding: 8,
    borderRadius: 6,
  },

  toggle: {
    width: 200,
    textAlign: 'center',
    margin: 8,
    color: 'white',
    padding: 0,
    backgroundColor: '#23408e',
  },

  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    margin: 10,
    borderRadius: 6,
    backgroundColor: '#ed1b24',
  },

  loginButtonText: {
    flex: 1,
    textAlign: 'center',
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
  },

  errText: {
    textAlign: 'center',
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
  },

  logo: {
    borderWidth: 15,
    borderColor: 'transparent',
    width: 400,
    height: 400,
    marginTop: 30,
    marginBottom: -30,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
