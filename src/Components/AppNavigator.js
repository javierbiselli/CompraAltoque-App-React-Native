import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Shop from "./Shop";
import Profile from "./Profile";
import Settings from "./Settings";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import shop from "../Assets/Images/shop.png";
import profile from "../Assets/Images/profile.png";
import config from "../Assets/Images/config.png";
import { Image, ImageBackground, View } from "react-native";
import MoreInfo from "./MoreInfo";
import Product from "./Product";
import logoRojo from "../Assets/Images/logoRojo.png";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Root = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Tiendas"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
              <ImageBackground
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 20,
                  marginBottom: 20,
                  backgroundColor: "rgb(255, 255, 255)",
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(0,0,0,0.1)",
                  borderRadius: 75,
                }}
              >
                <Image
                  style={{ width: "100%", height: 100, resizeMode: "contain" }}
                  source={logoRojo}
                />
              </ImageBackground>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          </View>
        );
      }}
    >
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image source={shop} style={[{ height: 30, width: 30 }]} />
          ),
        }}
        name="Tiendas"
        component={Root}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image source={profile} style={[{ height: 30, width: 30 }]} />
          ),
        }}
        name="Mi perfil"
        component={Profile}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image source={config} style={[{ height: 30, width: 30 }]} />
          ),
        }}
        name="Configuracion"
        component={Settings}
      />
      <Drawer.Screen name="Mas info" component={MoreInfo} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
