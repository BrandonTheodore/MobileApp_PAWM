import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function login() {
    try {
      const res = await fetch('https://domainmu.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${email}&password=${password}`,
      });

      setMsg(res.ok ? 'Login success' : 'Login failed');
    } catch {
      setMsg('Server error');
    }
  }

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Pressable style={styles.btn} onPress={login}>
        <Text style={{ color: '#fff' }}>Login</Text>
      </Pressable>
      <Text>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  input: { borderWidth: 1, marginVertical: 8, padding: 10 },
  btn: { backgroundColor: '#3b82f6', padding: 12, alignItems: 'center' },
});
