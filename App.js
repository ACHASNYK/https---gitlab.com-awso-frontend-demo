import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
WebBrowser.maybeCompleteAuthSession();
// web 643417147366-pifqmn3462kv5tsaggijnghokdk198vv.apps.googleusercontent.com
// ios 643417147366-0k4034693h56h9bnlm4b2m6jtq5nr2bv.apps.googleusercontent.com
export default function App() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "643417147366-pifqmn3462kv5tsaggijnghokdk198vv.apps.googleusercontent.com",
    iosClientId: "643417147366-0k4034693h56h9bnlm4b2m6jtq5nr2bv.apps.googleusercontent.com",
    expoClientId: "643417147366-foop8bi1bc6kl7jcpf65avf3okuatcu2.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response])
  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if(!user) {
      if(response?.type==="success") {
        await getUserInfo(response.authentication.accessToken);
      }

    } else {
      setUserInfo(JSON.parse(user));
    }
  }
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {console.log("an error:", error)}
  }
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
       <Button title="Sign in with Google" onPress={() => promptAsync()} />
       <Button title='delete local storage' onPress={() => AsyncStorage.removeItem("@user")}/> 
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
