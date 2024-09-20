import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button, Alert} from 'react-native';
import Home from './src/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import axios from 'axios';

// Login Screen
const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    try{
      const res = await axios.get('https://6555b88984b36e3a431e30d7.mockapi.io/api/users')
      const user = res.data.find((user) => user.username === username && user.password === password)

      if(user){
        navigation.navigate('Home');
        console.log('Login Successful');
      } else {
        Alert.alert('Login Failed','Invalid username or password');
      }
    } catch(error){
      Alert.alert('Login Failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign up here!
      </Text>
    </View>
  );
};

// Signup Screen
const SignupScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async() => {
    try{
      const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password)
      const Number = /\d/.test(password)
      
      if(!specialCharacter && Number){
        Alert.alert('Password Validation Failed')
        return;
      }
      
      const res = await axios.post('https://6555b88984b36e3a431e30d7.mockapi.io/api/users',{
        username,
        password
      })
      if(res.status === 201){
        Alert.alert('Signed Up successfully')
        navigation.navigate('Home')
      }
    } catch(error){
      Alert.alert('Signed Up Failed')
      console.error(error.message)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? Log in here!
      </Text>
    </View>
  );
};

// Create a stack navigator
const Stack = createStackNavigator();

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

// Main App component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  link: {
    marginTop: 10,
    color: 'blue',
  },
});

export default App;
