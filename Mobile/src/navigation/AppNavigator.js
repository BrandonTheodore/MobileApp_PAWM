import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CourseScreen from '../screens/CourseScreen';
import SimulationScreen from '../screens/SimulationScreen';
import ContactScreen from '../screens/ContactScreen';
import AboutScreen from '../screens/AboutScreen';
import LoginScreen from '../screens/LoginScreen';

// Course detail screens
import PrintScreen from '../screens/course/PrintScreen';
import ArithmeticScreen from '../screens/course/ArithmeticScreen';
import LoopingScreen from '../screens/course/LoopingScreen';
import ArrayScreen from '../screens/course/ArrayScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CourseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CourseList" component={CourseScreen} options={{ title: 'Course' }} />
      <Stack.Screen name="Print" component={PrintScreen} />
      <Stack.Screen name="Arithmetic" component={ArithmeticScreen} />
      <Stack.Screen name="Looping" component={LoopingScreen} />
      <Stack.Screen name="Array" component={ArrayScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Course" component={CourseStack} />
      <Tab.Screen name="Simulation" component={SimulationScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
}
