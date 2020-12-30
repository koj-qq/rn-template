import React from 'react';
import { Text, SafeAreaView, StatusBar } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" animated translucent backgroundColor="transparent" />
      <Text style={{ marginTop: StatusBar.currentHeight }}>123</Text>
    </SafeAreaView>
  );
};

export default App;
