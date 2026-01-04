import { ScrollView, Text, Image, StyleSheet } from 'react-native';
import loop1 from '../../assets/loop1.png';
import loop2 from '../../assets/loop2.png';

export default function LoopingScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Looping in Python</Text>

      <Text style={styles.p}>
        Loops in Python are used to repeat actions efficiently. The main types are For loops (counting through items) and While loops (based on conditions). There are 2 kinds of loop in python: For Loop and While Loop.
      </Text>

      <Text style={styles.h2}>For Loop</Text>


      <Text style={styles.p}>
        For loops is used to iterate over a sequence such as a list, tuple, string or range. It allow to execute a block of code repeatedly, once for each item in the sequence.
      </Text>

      <Image source={loop1} style={styles.img} />

      <Text style={styles.p}>
        Explanation: This code prints the numbers from 0 to 3 (inclusive) using a for loop that iterates over a range from 0 to n1 (where n is 4).
      </Text>

      <Text style={styles.h2}>While Loop</Text>
    
      <Text style={styles.p}>
          In Python, a while loop is used to execute a block of statements repeatedly until a given condition is satisfied. When the condition becomes false, the line immediately after the loop in the program is executed.
      </Text>
      <Text style={styles.p}>
          In below code, loop runs as long as the condition cnt 3 is true. It increments the counter by 1 on each iteration and prints "Hello Geek" three times.
      </Text>

      <Image source={loop2} style={styles.img} />

      <Text style={styles.source}>Source: GeeksforGeeks</Text>

      <Text style={styles.p}>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  h1: { fontSize: 22, fontWeight: 'bold' },
  h2: { fontSize: 18, fontWeight: '600', marginTop: 12 },
  p: { marginBottom: 12 , textAlign: 'justify' },
  img: { width: '100%', height: 200, resizeMode: 'contain'},
  source: { textAlign: 'right', fontStyle: 'italic' },
});
