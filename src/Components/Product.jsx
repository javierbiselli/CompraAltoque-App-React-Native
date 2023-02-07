import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import noImg from "../Assets/Images/productoSinImagen.png";
import { useNavigation } from "@react-navigation/native";

const Product = ({ product, searchBar }) => {
  const navigation = useNavigation();
  const calculateDiscount = (discountPercentage, formerPrice) => {
    const discount = discountPercentage;
    const price = formerPrice;
    return Math.round(price - (discount / 100) * price);
  };

  return (
    <View
      style={
        searchBar
          ? styles.defaultProduct
          : product.hasStar
          ? styles.starProduct
          : styles.defaultProduct
      }
    >
      <Image
        style={styles.productImage}
        source={product.image ? { uri: product.image } : noImg}
      />
      <View style={{ flexShrink: 1 }}>
        <Text style={styles.productName}>{product.name}</Text>
        <View>
          {product.hasDiscount ? (
            <>
              <Text
                style={{
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                }}
              >
                ${product.price}
              </Text>
              <Text style={styles.productPrice}>
                ${calculateDiscount(product.discountPercentage, product.price)}
              </Text>
            </>
          ) : (
            <Text style={styles.productPrice}>${product.price}</Text>
          )}
          {!searchBar && (
            <Text style={{ marginTop: 7, fontSize: 12 }}>
              {product.description}
            </Text>
          )}
        </View>
        {searchBar && (
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              elevation: 5,
              shadowColor: "gray",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              padding: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
            onPress={() => {
              navigation.navigate("Tiendas", {
                screen: "Shop",
                params: product.shopId,
              });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <View>
                <Text style={{ marginBottom: 3, fontWeight: "bold" }}>
                  {product.shopId.shopName}
                </Text>
                <Text>{product.shopId.shopAddress}</Text>
              </View>
              <Image
                style={styles.shopImage}
                source={
                  product.shopId.shopIcon
                    ? { uri: product.shopId.shopIcon }
                    : noImg
                }
              ></Image>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  starProduct: {
    borderWidth: 10,
    padding: 20,
    borderColor: "rgb(255, 215, 0);",
    borderRadius: 5,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  defaultProduct: {
    borderBottomWidth: 1,
    padding: 15,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    margin: 10,
    marginBottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginRight: 16,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 24,
    marginLeft: 8,
    fontWeight: "bold",
  },
  shopImage: {
    width: 40,
    height: 40,
  },
});
