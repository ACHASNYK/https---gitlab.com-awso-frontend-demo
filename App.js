import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
WebBrowser.maybeCompleteAuthSession();
// web 643417147366-pifqmn3462kv5tsaggijnghokdk198vv.apps.googleusercontent.com
// ios 643417147366-0k4034693h56h9bnlm4b2m6jtq5nr2bv.apps.googleusercontent.com
export default function App() {
  const [userInfo, setUserInfo] = React.useState(null);
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <StatusBar style="auto" />
    </View>
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
