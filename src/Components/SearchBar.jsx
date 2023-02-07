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
  const [suggestions, setSuggestions] = useState("");
  const [clicked, setClicked] = useState(false);

  const [showResults, setShowResults] = useState(false);

  const [searchHistory, setSearchHistory] = useState([]);

  const [showHistory, setShowHistory] = useState(false);

  const [searchState, setSearchState] = useState(false);

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
      const currentSearchList = currentSearches
        ? JSON.parse(currentSearches)
        : [];
      if (
        !currentSearchList
          .toString()
          .toLowerCase()
          .includes(search.toString().toLowerCase())
      ) {
        const newSearches = [search, ...currentSearchList];
        await AsyncStorage.setItem("searches", JSON.stringify(newSearches));
        setSearchHistory(newSearches);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchTerm.length > 1) {
        setIsLoading(true);
        await dispatch(searchProducts(searchTerm)).then((response) => {
          setShowResults(true);
          const filteredActives = response.data.filter(
            (products) => products.isActive
          );
          filteredActives.sort((a, b) => {
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

          setSuggestions(filteredActives);
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
      ) : suggestions.length === 0 && showResults ? (
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
                    <Text>Busquedas recientes:</Text>
                  )}
                </View>
                {searchHistory.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSearchTerm(search);
                      setSearchState(true);
                    }}
                  >
                    <View style={styles.searchItem}>
                      <Text>{search}</Text>
                      <View style={{ marginLeft: 10 }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "red",
                            borderRadius: 20,
                            width: 22,
                            height: 22,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onPress={() => deleteSearches(search)}
                        >
                          <Text style={{ color: "white" }}>X</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )
          }
          data={suggestions}
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
    height: 50,
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
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
    borderRadius: 15,
    marginTop: 8,
  },
});

export default SearchBar;
