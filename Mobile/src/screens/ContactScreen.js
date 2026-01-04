import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function ContactScreen() {
  return (
    <View>
      <Header />
      <View style={styles.card}>
        <Text style={styles.h2}>Contact Us</Text>
        <Text>Distributed System Laboratory</Text>
        <Text>Labtek V, 4th floor</Text>
        <Text>Institut Teknologi Bandung</Text>
        <Text>+62-812-345-678</Text>
        <Text>akuwibu@gmail.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { margin: 16, backgroundColor: '#fff', padding: 16 },
  h2: { fontSize: 18, fontWeight: 'bold' },
});
