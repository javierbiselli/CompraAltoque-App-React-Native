import { Alert, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  const handlePress = async () => {
    Alert.alert(
      "Borrar historial",
      "¿Estás seguro de que deseas borrar el historial de navegación?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Borrar",
          onPress: async () => {
            await AsyncStorage.removeItem("searches");
            Alert.alert("Historial borrado");
          },
        },
      ]
    );
  };

  return (
    <View style={{ margin: 15 }}>
      <Text style={{ fontSize: 26, marginBottom: 25 }}>Configuracion</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 3,
          alignItems: "center",
          padding: 10,
          borderWidth: 1,
          borderColor: "red",
        }}
        onPress={handlePress}
      >
        <Text style={{ fontSize: 16 }}>Borrar el historial de navegacion</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
