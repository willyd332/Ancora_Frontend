import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import styles from './styles';
import {login, register, checkForUser} from './api';

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
    checkForUser(this.state, this.handleUpdate, this.handleNavigate);
  }

  handleUpdate = (update) => {
    this.setState(update);
  };

  handleNavigate = (data) => {
    this.props.navigation.navigate('Home', {
      userData: data,
    });
  };

  renderRegister = () => {
    if (this.state.register) {
      return (
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
            onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
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
              register(this.state, this.handleUpdate, this.handleNavigate);
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
      );
    }
    return null;
  };

  renderLogin = () => {
    if (!this.state.register) {
      return (
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
              login(this.state, this.handleUpdate, this.handleNavigate);
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
      );
    }
    return null;
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          dismissKeyboard();
        }}>
        <View style={styles.container}>
          {this.renderLogin()}
          {this.renderRegister()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
