import { ScrollView, Text, StyleSheet, View } from 'react-native';
import Header from '../components/Header';

export default function HomeScreen() {
  return (
    <ScrollView>
      <Header />

      <View style={styles.card}>
        <Text style={styles.h2}>Introduction</Text>
        <Text>
          Python is a popular high-level programming language loved for its
          simple syntax and powerful features.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.h2}>Quote</Text>
        <Text style={styles.quote}>
          "Python has been an important part of Google since the beginning..."
        </Text>
        <Text style={styles.author}>– Peter Norvig</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 10,
  },
  h2: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  quote: { fontStyle: 'italic' },
  author: { textAlign: 'right', marginTop: 8 },
});
