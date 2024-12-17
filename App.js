import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Navigation from './pages/navigation/Navigation';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
      <StatusBar />
      
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 40
    
  },
});

