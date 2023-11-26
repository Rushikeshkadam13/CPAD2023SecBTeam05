import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './screens/groupsScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Openrohit to lkjhgft working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={ProfileScreen} />
        {/* Add more screens as needed */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
