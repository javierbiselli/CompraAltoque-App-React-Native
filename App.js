import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./src/Redux/store";
import Header from "./src/Components/Header";
import DrawerNavigation from "./src/Components/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <DrawerNavigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
