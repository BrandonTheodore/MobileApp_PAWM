import { ScrollView, Text, Image, StyleSheet } from 'react-native';
import arithmetic1 from '../../assets/arithmetic1.png';

export default function ArithmeticScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Arithmetic in Python</Text>

      <Text style={styles.p}>
        Python operators are fundamental for performing mathematical calculations. Arithmetic operators are symbols used to perform mathematical operations on numerical values. Arithmetic operators include addition (+), subtraction (-), multiplication (*), division (/), and modulus (%). Below is the table for available arithmetic operator in Python.
      </Text>

      <Image source={arithmetic1} style={styles.img} />

      <Text style={styles.source}>Source: GeeksforGeeks</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  h1: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  p: { marginBottom: 12 , textAlign: 'justify' },
  img: { width: '100%', height: 400, marginBottom: 12 , resizeMode: 'contain'},
  source: { textAlign: 'right', fontStyle: 'italic' },
});
