import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
