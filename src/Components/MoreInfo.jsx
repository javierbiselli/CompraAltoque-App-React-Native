import { Text, TouchableOpacity, View, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";

const MoreInfo = () => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("3108100900010001539607");
    Alert.alert("CBU copiado!");
  };

  return (
    <View
      style={{ padding: 5, height: "100%", justifyContent: "space-between" }}
    >
      <View>
        <Text>
          Esta app fue creada por una sola persona a modo de practica, por lo
          tanto tene paciencia si no funciona todo al 100%.
        </Text>
        <Text>
          Si encontras algun error o la app no responde como deberia, contactate
          conmigo por email a javierbiselli@gmail.com y contame que fue lo que
          paso, lo agradeceria mucho.
        </Text>
        <Text>
          La app sigue en desarrollo y pronto va a tener muchas mas cosas!
        </Text>
        <Text style={{ marginTop: 20, marginBottom: 10 }}>
          Para apoyar este proyecto, podes donarme a:
        </Text>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={copyToClipboard}
            style={{
              width: "75%",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 8,
              elevation: 5,
              shadowColor: "gray",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              padding: 10,
            }}
          >
            <Text>Banco del Sol</Text>
            <Text>JAVIER FRANCO BISELLI</Text>
            <Text>Alias: jbiselli.bds.ars</Text>
            <Text>CBU: 3108100900010001539607</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>Creada con React Native - version 0.1/febrero 2023</Text>
        <Text>por Javier Biselli</Text>
      </View>
    </View>
  );
};

export default MoreInfo;
