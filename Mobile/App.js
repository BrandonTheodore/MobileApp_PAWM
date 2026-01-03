import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, Image, ScrollView, 
  TouchableOpacity, Dimensions, TextInput, Alert, StatusBar 
} from 'react-native';
import { Home, Book, PlayCircle, Mail } from 'lucide-react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { width } = Dimensions.get('window');
const Stack = createStackNavigator();

// --- REUSABLE COMPONENTS ---

const Header = () => {
  const logoUri = 'https://via.placeholder.com/64'; 
  return (
    <View style={styles.siteHeader}>
      <View style={styles.logoArea}>
        <Image 
          source={{ uri: logoUri }} 
          style={styles.logoIcon} 
        />
        <View style={styles.logoText}>
          <Text style={styles.h1}>Virtual Laboratory</Text>
          <Text style={styles.subtitle}>Python Programming</Text>
        </View>
      </View>
    </View>
  );
};

const Navbar = ({ navigation, activeRoute }) => {
  const navItems = [
    { name: 'Home', route: 'Home' },
    { name: 'Course', route: 'Course' },
    { name: 'Simulation', route: 'Simulation' },
    { name: 'Contact', route: 'Contact' },
  ];

  return (
    <View style={styles.mainNav}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {navItems.map((item) => (
          <TouchableOpacity 
            key={item.name} 
            onPress={() => navigation.navigate(item.route)}
            style={[styles.navItem, activeRoute === item.name ? styles.navActive : null]}
          >
            <Text style={[styles.navText, activeRoute === item.name ? styles.navTextActive : null]}>
              {item.name.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginBtnText}>LOGIN</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// --- SCREENS ---

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('introduction');
  return (
    <View style={styles.screenWrapper}>
      <Header />
      <Navbar navigation={navigation} activeRoute="Home" />
      <ScrollView>
        <View style={styles.carouselContainer}>
          <Text style={styles.carouselText}>Welcome to Python!</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.tabLinks}>
            <TouchableOpacity onPress={() => setActiveTab('introduction')} style={[styles.tabLink, activeTab === 'introduction' ? styles.tabActive : null]}>
              <Text style={activeTab === 'introduction' ? styles.tabTextActive : styles.tabText}>INTRODUCTION</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('quote')} style={[styles.tabLink, activeTab === 'quote' ? styles.tabActive : null]}>
              <Text style={activeTab === 'quote' ? styles.tabTextActive : styles.tabText}>QUOTE</Text>
            </TouchableOpacity>
          </View>
          {activeTab === 'introduction' ? (
            <View><Text style={styles.h2}>Introduction</Text><Text style={styles.p}>Python is a high-level programming language loved for its simple, readable syntax.</Text></View>
          ) : (
            <View><Text style={styles.h2}>Quote</Text><Text style={styles.quote}>"Python has been an important part of Google since the beginning..."</Text></View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const CourseScreen = ({ navigation }) => (
  <View style={styles.screenWrapper}>
    <Header />
    <Navbar navigation={navigation} activeRoute="Course" />
    <ScrollView style={styles.container}>
      {['Print', 'Arithmetic', 'Looping', 'Arrays'].map((title) => (
        <View key={title} style={styles.courseItem}>
          <Text style={styles.courseTitle}>{title}</Text>
          <TouchableOpacity onPress={() => Alert.alert('Course', `Opening ${title}...`)}>
            <Text style={styles.linkText}>View course</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  </View>
);

const ContactScreen = ({ navigation }) => (
  <View style={styles.screenWrapper}>
    <Header />
    <Navbar navigation={navigation} activeRoute="Contact" />
    <View style={styles.container}>
      <Text style={styles.h2}>Contact Us</Text>
      <Text style={styles.p}>Distributed System Laboratory{"\n"}Labtek V, 4th floor{"\n"}ITB, Bandung</Text>
      <Text style={styles.p}>Email: akuwibu@gmail.com</Text>
    </View>
  </View>
);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.screenWrapper}>
      <Header />
      <View style={styles.authContainer}>
        <View style={styles.authBox}>
          <Text style={styles.h2}>Login</Text>
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
          <TouchableOpacity style={styles.authButton} onPress={() => Alert.alert('Login', email)}>
            <Text style={styles.authButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const SimulationScreen = ({ navigation }) => (
  <View style={styles.screenWrapper}>
    <Header /><Navbar navigation={navigation} activeRoute="Simulation" />
    <View style={styles.container}><Text style={styles.h2}>Simulation Mode</Text></View>
  </View>
);

// --- MAIN APP ---

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Course" component={CourseScreen} />
        <Stack.Screen name="Simulation" component={SimulationScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



// --- STYLES ---

const styles = StyleSheet.create({
  screenWrapper: { 
    flex: 1, 
    backgroundColor: '#f3f4f6', 
    paddingTop: Number(StatusBar.currentHeight) || 40
  },
  container: { padding: 20 },
  siteHeader: { backgroundColor: '#fff', padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  logoArea: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: { width: 50, height: 50, marginRight: 15 },
  h1: { fontSize: 20, fontWeight: 'bold', color: '#0c4a6e' },
  subtitle: { fontSize: 12, color: '#4b5563' },
  mainNav: { backgroundColor: '#0a4a8c', paddingVertical: 10 },
  navItem: { paddingHorizontal: 15, paddingVertical: 10 },
  navActive: { borderBottomWidth: 3, borderBottomColor: '#3b82f6' },
  navText: { color: '#d1d5db', fontSize: 12, fontWeight: '600' },
  navTextActive: { color: '#fff' },
  loginBtn: { backgroundColor: '#3b82f6', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 4, marginLeft: 10 },
  loginBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  carouselContainer: { height: 180, backgroundColor: '#313b4d', justifyContent: 'center', alignItems: 'center' },
  carouselText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  tabLinks: { flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#e5e7eb', marginBottom: 15 },
  tabLink: { padding: 10 },
  tabActive: { borderBottomWidth: 3, borderBottomColor: '#0a4a8c' },
  tabText: { color: '#6b7280', fontSize: 12 },
  tabTextActive: { color: '#0a4a8c', fontWeight: 'bold' },
  h2: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#1f2937' },
  p: { fontSize: 16, color: '#4b5563', lineHeight: 24, marginBottom: 15 },
  courseItem: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderLeftWidth: 5, borderLeftColor: '#0a4a8c' },
  courseTitle: { fontSize: 18, fontWeight: 'bold' },
  linkText: { color: '#3b82f6', marginTop: 5 },
  authContainer: { flex: 1, justifyContent: 'center', padding: 20 },
  authBox: { backgroundColor: '#fff', padding: 30, borderRadius: 10, elevation: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 5, marginBottom: 15 },
  authButton: { backgroundColor: '#3b82f6', padding: 15, borderRadius: 5, alignItems: 'center' },
  authButtonText: { color: '#fff', fontWeight: 'bold' },
});