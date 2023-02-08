import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  TextInput,
  FlatList,
  TouchableNativeFeedback,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/products/thunks";
import Loader from "./Loader";
import { useRoute } from "@react-navigation/native";
import noImage from "../Assets/Images/productoSinImagen.png";
import Product from "./Product";
import searchImg from "../Assets/Images/search.png";
import back from "../Assets/Images/back.png";

const Shop = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const isLoading = useSelector((state) => state.products.isLoading);
  const oldListProducts = useSelector((state) => state.products.list);

  const listProducts = oldListProducts.filter(
    (product) => product.shopId._id === route.params._id && product.isActive
  );

  const starProducts = listProducts.filter((product) => product.hasStar);

  const discountedProducts = listProducts.filter(
    (product) => product.hasDiscount && !product.hasStar
  );

  const normalProducts = listProducts.filter(
    (product) => !product.hasStar && !product.hasDiscount
  );

  const sections = [
    {
      title: "Destacados",
      data: starProducts,
    },
    {
      title: "Con descuento",
      data: discountedProducts,
    },
    {
      title: "Mas productos",
      data: normalProducts,
    },
  ];

  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState("");

  const [showResults, setShowResults] = useState(false);
  const [clicked, setClicked] = useState(false);

  const filterData = () => {
    setShowResults(true);
    if (value.length > 2) {
      setFilteredData(
        listProducts.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleSearchBarPress = () => {
    setClicked(true);
  };

  const handleSearchBarDefocused = () => {
    setValue("");
    Keyboard.dismiss();
    setShowResults(false);
    setClicked(false);
  };

  return (
    <>
      {!isLoading ? (
        <View style={styles.container}>
          <SectionList
            ListHeaderComponent={
              <>
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "lightblue",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 20,
                  }}
                >
                  <Image
                    style={styles.productImage}
                    source={
                      route.params.shopIcon
                        ? { uri: route.params.shopIcon }
                        : noImage
                    }
                  ></Image>
                  <View style={{ flexShrink: 1 }}>
                    <Text style={styles.shopName}>{route.params.shopName}</Text>
                    <Text style={styles.shopAddress}>
                      {route.params.shopAddress}
                    </Text>
                    <Text style={styles.shopAddress}>
                      {route.params.shopDescription}
                    </Text>
                    {route.params.shopExtraInfo && (
                      <Text style={styles.shopAddress}>
                        {route.params.shopExtraInfo}
                      </Text>
                    )}
                  </View>
                </View>
                <View>
                  {clicked && (
                    <View style={styles.searchHeaderContainer}>
                      <TouchableNativeFeedback
                        onPress={handleSearchBarDefocused}
                      >
                        <Image source={back} style={styles.backButton}></Image>
                      </TouchableNativeFeedback>
                      <View style={{ width: "100%" }}>
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          Busca en {route.params.shopName}:
                        </Text>
                      </View>
                    </View>
                  )}
                  <View style={styles.containerSearchBar}>
                    <TouchableNativeFeedback onPress={filterData}>
                      <Image source={searchImg} style={styles.image}></Image>
                    </TouchableNativeFeedback>
                    <TextInput
                      style={styles.input}
                      placeholder="Que buscas?"
                      onChangeText={(text) => {
                        setValue(text);
                      }}
                      value={value}
                      onFocus={handleSearchBarPress}
                      onSubmitEditing={filterData}
                    />
                  </View>
                  {filteredData.length === 0 && showResults ? (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        marginBottom: 15,
                      }}
                    >
                      No se encontro ningun producto
                    </Text>
                  ) : (
                    showResults && (
                      <FlatList
                        data={filteredData}
                        renderItem={({ item }) => (
                          <Product product={item} searchBar={false} />
                        )}
                      />
                    )
                  )}
                </View>
              </>
            }
            sections={sections}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item: product }) => <Product product={product} />}
            renderSectionHeader={({ section }) => {
              if (section.data.length === 0) {
                return section.ListEmptyComponent;
              }
              return (
                <View
                  style={{
                    borderTopWidth: 5,
                    borderTopColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Text
                    style={{
                      margin: 15,
                      marginLeft: 20,
                      fontSize: 20,
                    }}
                  >
                    {section.title}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <Loader />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  shopName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  shopAddress: {
    fontSize: 16,
    marginTop: 8,
  },
  productContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 24,
    marginLeft: 8,
    fontWeight: "bold",
  },
  containerSearchBar: {
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  image: {
    width: 18,
    height: 18,
    marginLeft: 20,
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  searchHeaderContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  backButton: {
    width: 26,
    height: 26,
    marginLeft: 20,
    textAlign: "start",
    position: "absolute",
    zIndex: 1000,
  },
});

export default Shop;
