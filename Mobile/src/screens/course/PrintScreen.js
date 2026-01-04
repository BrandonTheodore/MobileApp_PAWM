import { ScrollView, Text, Image, StyleSheet } from 'react-native';
import print1 from '../../assets/print1.png';
import print2 from '../../assets/print2.png';
import print3 from '../../assets/print3.png';

export default function PrintScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Print in Python</Text>

      <Text style={styles.p}>
        Python print() function prints the message to the screen or any other standard output device. In this course, we will cover about print() function in Python as well as it's various operations. Below is the print syntax in python with its parameters!
      </Text>

      <Image source={print1} style={styles.img} />

      <Text style={styles.p}>
        Though it is not necessary to pass arguments in print() function, it requires an empty parenthesis at the end that tells Python to execute the function rather than calling it by name. Now, let's explore the optional arguments that can be used with the print() function.
      </Text>
      <Text style={styles.p}>
        In this example, we have 2 variables integer and string. We are printing all variables with print() function.
      </Text>

      <Image source={print2} style={styles.img} />

      <Text style={styles.h1}>How print() works in Python?</Text>

      <Text style={styles.p}>
          You can pass variables, strings, numbers, or other data types as one or more parameters when using the print() function. Then, these parameters are represented as strings by their respective str() functions. To create a single output string, the transformed strings are concatenated with spaces between them.
      </Text>

      <Text style={styles.p}>
          In this code, we are passing two parameters name and age to the print function.
      </Text>

      <Image source={print3} style={styles.img} />

      <Text style={styles.source}>Source: GeeksforGeeks</Text>

      <Text style={styles.p}>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  h1: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  p: { marginBottom: 12 , textAlign: 'justify' },
  img: { width: '100%', height: 200, resizeMode: 'contain'},
  source: { textAlign: 'right', fontStyle: 'italic' },
});
