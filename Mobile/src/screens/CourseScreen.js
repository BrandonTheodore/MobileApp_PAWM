import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Header from '../components/Header';

export default function CourseScreen({ navigation }) {
  const courses = [
    { title: 'Print', desc: 'Basic output in Python', screen: 'Print' },
    { title: 'Arithmetic', desc: 'Math operations in Python', screen: 'Arithmetic' },
    { title: 'Looping', desc: 'For & While loops', screen: 'Looping' },
    { title: 'Array', desc: 'List & Array in Python', screen: 'Array' },
  ];

  return (
    <ScrollView>
      <Header />

      {courses.map((c, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.title}>{c.title}</Text>
          <Text>{c.desc}</Text>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate(c.screen)}
          >
            <Text style={styles.buttonText}>View Course</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#0a4a8c',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  button: {
    marginTop: 12,
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
