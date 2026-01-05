import { ScrollView, Text, Image, StyleSheet } from 'react-native';
import array1 from '../../assets/array1.png';
import array2 from '../../assets/array2.png';
import array3 from '../../assets/array3.png';
import array4 from '../../assets/array4.png';
import array5 from '../../assets/array5.png';


export default function ArrayScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Array in Python</Text>

      <Text style={styles.p}>
        Lists in Python are the most flexible and commonly used data structure for sequential storage. They are similar to arrays in other languages but with several key differences:
      </Text>

      <Text style={styles.p}>
        Dynamic Typing: Python lists can hold elements of different types in the same list. We can have an integer, a string and even other lists all stored within a single list.{"\n"}
        Dynamic Resizing:Lists are dynamically resized, meaning you can add or remove elements without declaring the size of the list upfront.{"\n"}
        Built-in Methods: Python lists come with numerous built-in methods that allow for easy manipulation of the elements within them, including methods for appending, removing, sorting and reversing elements.
      </Text>

      <Text style={styles.h1}>Python Arrays</Text>

      <Text style={styles.p}>
          In Python, array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together. Unlike Python lists (can store elements of mixed types), arrays must have all elements of same type. Having only homogeneous elements makes it memory-efficient.
      </Text>

      <Image source={array1} style={styles.img} />

      <Text style={styles.h2}>Creating an Array in Python</Text>

      <Text style={styles.p}>
          Array in Python can be created by importing an array module. array( data_type , value_list ) is used to create array in Python with data type and value list specified in its arguments.
      </Text>

      <Image source={array2} style={styles.img} />

      <Text style={styles.h2}>Adding Elements to an Array</Text>

      <Text style={styles.p}>
          Elements can be added to the Python Array by using built-in insert() function. Insert is used to insert one or more data elements into an array. Based on the requirement, a new element can be added at the beginning, end, or any given index of array. append() is also used to add the value mentioned in its arguments at the end of the Python array.
      </Text>

      <Image source={array3} style={styles.img} />

      <Text style={styles.h2}>Accessing Array Items</Text>

      <Text style={styles.p}>
          In order to access the array items refer to the index number. Use the index operator [ ] to access an item in a array in Python. The index must be an integer.
      </Text>

      <Image source={array4} style={styles.img} />

      <Text style={styles.h2}>Removing Elements from the Array</Text>

      <Text style={styles.p}>
        Elements can be removed from the Python array by using built-in remove() function. It will raise an Error if element doesn’t exist. Remove() method only removes the first occurrence of the searched element. To remove range of elements, we can use an iterator.{"\n"}
        pop() function can also be used to remove and return an element from the array. By default it removes only the last element of the array. To remove element from a specific position, index of that item is passed as an argument to pop() method.
      </Text>

      <Image source={array5} style={styles.img} />

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
