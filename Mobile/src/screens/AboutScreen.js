import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function AboutScreen() {
  return (
    <View>
      <Header />
      <View style={styles.card}>
        <Text style={styles.h2}>About Us</Text>
        <Text>Distributed System Laboratory</Text>
        <Text>Institut Teknologi Bandung</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { margin: 16, backgroundColor: '#fff', padding: 16 },
  h2: { fontSize: 18, fontWeight: 'bold' },
});
