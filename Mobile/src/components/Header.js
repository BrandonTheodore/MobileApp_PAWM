import { View, Text, StyleSheet, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={{ uri: 'https://placehold.co/80x80' }}
        style={styles.logo}
      />
      <View>
        <Text style={styles.title}>Virtual Laboratory</Text>
        <Text style={styles.sub}>Python Programming</Text>
        <Text style={styles.subsub}>Institut Teknologi Bandung</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: { width: 60, height: 60, marginRight: 12 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#0a4a8c' },
  sub: { fontSize: 12 },
  subsub: { fontSize: 10 },
});
