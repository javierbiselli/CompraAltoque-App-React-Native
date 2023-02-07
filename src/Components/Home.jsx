import { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableNativeFeedback,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getShops } from "../Redux/shops/thunks";
import noImage from "../Assets/Images/productoSinImagen.png";
import Loader from "./Loader";
import SearchBar from "./SearchBar";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShops());
  }, []);

  const isLoading = useSelector((state) => state.shops.isLoading);
  const listShops = useSelector((state) => state.shops.list);

  const [clearContent, setClearContent] = useState(false);

  const handleUpdateContent = (newValue) => {
    setClearContent(newValue);
  };

  return (
    <>
      <View style={{ height: "100%", width: "100%" }}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <SearchBar
              handleUpdateContent={handleUpdateContent}
              clearContent={clearContent}
            />
            {!clearContent && (
              <FlatList
                data={listShops}
                ListHeaderComponent={<Text>{listShops.length} tiendas</Text>}
                ListHeaderComponentStyle={{
                  margin: 15,
                  marginBottom: 0,
                  padding: 0,
                }}
                renderItem={({ item: shop }) => (
                  <TouchableNativeFeedback
                    onPress={() => {
                      navigation.navigate("Tiendas", {
                        screen: "Shop",
                        params: shop,
                      });
                    }}
                  >
                    <View
                      style={{
                        padding: 20,
                        borderBottomWidth: 1,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderBottomColor: "rgba(0,0,0, 0.2)",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{
                          width: 120,
                          height: 120,
                          marginRight: 40,
                          borderRadius: 10,
                          resizeMode: "cover",
                        }}
                        source={
                          shop.shopIcon ? { uri: shop.shopIcon } : noImage
                        }
                      ></Image>
                      <View style={{ flexShrink: 1 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                          {shop.shopName}
                        </Text>
                        <Text style={{ marginVertical: 5 }}>
                          {shop.shopAddress}
                        </Text>
                        <Text>{shop.shopDescription}</Text>
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                )}
              />
            )}
          </>
        )}
      </View>
    </>
  );
};

export default Home;
