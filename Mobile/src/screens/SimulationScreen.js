import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';

export default function SimulationScreen() {
  return (
    <ScrollView>
      <Header />

      <View style={styles.card}>
        <Text style={styles.header}>Code</Text>
        <TextInput
          multiline
          style={styles.editor}
          placeholder="Ketik kode di sini..."
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.header}>Result</Text>
        <TextInput
          multiline
          editable={false}
          style={styles.editor}
          placeholder="Hasil akan ditampilkan di sini..."
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { margin: 16 },
  header: { fontWeight: 'bold', marginBottom: 8 },
  editor: {
    height: 200,
    borderWidth: 1,
    padding: 12,
    fontFamily: 'monospace',
  },
});
