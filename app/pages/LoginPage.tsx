import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppRouter';
import useAuth from '../hooks/useAuth'; // Hook untuk manage token

type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginPageNavigationProp>();
  
  const { saveToken } = useAuth(); // Hook untuk simpan token

  const handleLogin = async () => {
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'admin';
    
    if (username === hardcodedUsername && password === hardcodedPassword) {
      try {
        const token = '47081337-8433ddb8c31f27dc9e144feb6'; // Token pixabay

        // simpan token ke redux dan asynxstorage
        saveToken(token);
        navigation.navigate('Home'); // Navigate ke Home page setelah login sukses
      } catch (error) {
        console.error(error);
        setErrorMessage('Login failed. Please try again.');
      }
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 16,
    width: '40%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginPage;
