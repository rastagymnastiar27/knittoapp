import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppRouter';
import { setToken } from '../features/authSlice'; // Menyimpan token di Redux

type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginPageNavigationProp>(); // Gunakan tipe navigasi yang sesuai

  const handleLogin = async () => {
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'admin'; // Username dan password yang hardcoded

    if (username === hardcodedUsername && password === hardcodedPassword) {
      // Jika login berhasil
      const token = '47081337-8433ddb8c31f27dc9e144feb6'; // Hardcoded API Key
      dispatch(setToken(token)); // Simpan token ke Redux
      navigation.navigate('Home'); // Navigasi ke halaman utama
    } else {
      // Jika login gagal
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

      {/* Custom Login Button - Not Full Width */}
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
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
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
    backgroundColor: '#007BFF', // Tombol dengan warna biru
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center', // Agar tombol berada di tengah
    marginTop: 16,
    width: '40%', // Mengatur lebar tombol supaya tidak full width
  },
  loginButtonText: {
    color: '#fff', // Warna teks putih
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Agar teks berada di tengah tombol
  },
});

export default LoginPage;
