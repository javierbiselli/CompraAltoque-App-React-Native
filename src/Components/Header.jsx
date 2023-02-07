import { View, Text, TouchableNativeFeedback, Image } from "react-native";
import Constants from "expo-constants";
import noNotifImg from "../Assets/Images/noNotifications.png";
import ModalShared from "./Modal";
import { useState } from "react";
import menuImg from "../Assets/Images/menu.png";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          height: 55,
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 3,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: Constants.statusBarHeight,
        }}
      >
        <TouchableNativeFeedback
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Image source={menuImg} style={{ width: 30, height: 30 }} />
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={() => setModalVisible(true)}>
          <Image source={noNotifImg} style={{ width: 30, height: 30 }} />
        </TouchableNativeFeedback>
      </View>
      <ModalShared
        content={<Text>"Estas son las notificaciones"</Text>}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default Header;
