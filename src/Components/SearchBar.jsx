import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  Text,
  TouchableNativeFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import searchImg from "../Assets/Images/search.png";
import back from "../Assets/Images/back.png";
import Product from "./Product";
import { useDispatch } from "react-redux";
import { searchProducts } from "../Redux/products/thunks";
import Loader from "./Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchBar = ({ handleUpdateContent }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const calculateDiscount = (discountPercentage, formerPrice) => {
    const discount = discountPercentage;
    const price = formerPrice;
    return Math.round(price - (discount / 100) * price);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState("");
  const [clicked, setClicked] = useState(false);

  const [showResults, setShowResults] = useState(false);

  const [searchHistory, setSearchHistory] = useState([]);

  const [showHistory, setShowHistory] = useState(false);

  const [searchState, setSearchState] = useState(false);

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem("searches");
        if (history !== null) {
          setSearchHistory(JSON.parse(history));
        } else {
          setSearchHistory([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
    console.log("useeffect searchhistory ejecutado");
  }, [clicked]);

  const saveSearch = async (search) => {
    try {
      const currentSearches = await AsyncStorage.getItem("searches");
      let currentSearchList = currentSearches
        ? JSON.parse(currentSearches)
        : [];

      // Verifica si la búsqueda ya existe en el array
      const searchIndex = currentSearchList.indexOf(search);
      if (searchIndex !== -1) {
        // Si existe, la elimina y la agrega al principio
        currentSearchList.splice(searchIndex, 1);
      }

      const newSearches = [search, ...currentSearchList];
      await AsyncStorage.setItem("searches", JSON.stringify(newSearches));
      setSearchHistory(newSearches);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchTerm.length > 1) {
        setIsLoading(true);
        await dispatch(searchProducts(searchTerm)).then((response) => {
          console.log(response);
          setShowResults(true);
          response.data.sort((a, b) => {
            const priceAWithDiscount = calculateDiscount(
              a.hasDiscount ? a.discountPercentage : 0,
              a.price
            );

            const priceBWithDiscount = calculateDiscount(
              b.discountPercentage ? b.discountPercentage : 0,
              b.price
            );

            if (priceAWithDiscount < priceBWithDiscount) {
              return -1;
            }
            if (priceAWithDiscount > priceBWithDiscount) {
              return 1;
            }
          });

          setResults(response.data);
          setIsLoading(false);
        });
        saveSearch(searchTerm);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSearchBarPress = () => {
    setShowHistory(true);
    handleUpdateContent(true);
    setClicked(true);
  };

  const handleSearchBarDefocused = () => {
    handleUpdateContent(false);
    setSearchTerm("");
    setClicked(false);
    Keyboard.dismiss();
    setShowResults(false);
    setShowHistory(false);
  };

  const deleteSearches = async (value) => {
    try {
      const currentSearches = await AsyncStorage.getItem("searches");
      const currentSearchList = JSON.parse(currentSearches);
      const newSearches = currentSearchList.filter(
        (search) => search !== value
      );
      await AsyncStorage.setItem("searches", JSON.stringify(newSearches));
      setSearchHistory(newSearches);
    } catch (error) {
      console.error(error);
    }
  };

  if (searchState) {
    handleSearch();
    setSearchState(false);
  }

  return (
    <>
      {clicked && (
        <View style={styles.searchHeaderContainer}>
          <TouchableNativeFeedback onPress={handleSearchBarDefocused}>
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
              Mejores productos
            </Text>
          </View>
        </View>
      )}
      <>
        <View style={styles.container}>
          <TouchableNativeFeedback onPress={handleSearch}>
            <Image source={searchImg} style={styles.image}></Image>
          </TouchableNativeFeedback>
          <TextInput
            style={styles.input}
            placeholder="Que se te antoja?"
            value={searchTerm}
            autoCapitalize={true}
            autoCorrect={false}
            onChangeText={(e) => setSearchTerm(e)}
            onFocus={handleSearchBarPress}
            onSubmitEditing={handleSearch}
          />
        </View>
      </>
      {isLoading ? (
        <Loader />
      ) : results.length === 0 && showResults ? (
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          No se encontro ningun producto... y si intentas ser menos especifico?
        </Text>
      ) : (
        <FlatList
          ListHeaderComponent={
            showHistory && (
              <View style={styles.searchItemContainer}>
                <View style={{ width: "100%", marginLeft: 20 }}>
                  {searchHistory.length > 0 && (
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        marginBottom: 5,
                      }}
                    >
                      Busquedas recientes
                    </Text>
                  )}
                </View>
                {searchHistory.slice(0, 3).map((search, index) => (
                  <TouchableOpacity
                    style={{ width: "100%" }}
                    key={index}
                    onPress={() => {
                      setSearchTerm(search);
                      setSearchState(true);
                    }}
                  >
                    <View style={styles.searchItem}>
                      <Text style={{ marginBottom: 5 }}>{search}</Text>
                      <View style={{ marginLeft: 10 }}>
                        <TouchableOpacity
                          style={{
                            width: 25,
                          }}
                          onPress={() => deleteSearches(search)}
                        >
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )
          }
          data={results}
          renderItem={({ item }) =>
            showResults ? <Product product={item} searchBar={true} /> : null
          }
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
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
  searchItemContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowOffset: { width: 1, height: 1 },
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
    marginTop: 8,
  },
});

export default SearchBar;
