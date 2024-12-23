import React from "react";
import AuthNavigator from "./navigation/AuthNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useAuthStore from "./state/useAuthStore";
import AppNavigator from "./navigation/AppNavigator";
import { StatusBar } from "react-native";
import { NetworkProvider } from "./context/NetworkProvider";
import NoInternetBanner from "./components/NoInternetBanner";

const App = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <NetworkProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <NoInternetBanner />
        {!isLoggedIn ? <AuthNavigator /> : <AppNavigator />}
      </GestureHandlerRootView>
    </NetworkProvider>
  );
};

export default App;
