// FavoriteScreen.js

import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  // Access the list of favorite recipes from Redux state
  const favoriteRecipesList = useSelector(
    (state) => state.favorites.favoriterecipes
  );

  if (favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        {/* Go back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        if (item.idFood) {
          // Imported recipe
          navigation.navigate("RecipeDetail", { recipe: item });
        } else {
          // Custom recipe
          navigation.navigate("CustomRecipesScreen", { recipe: item });
        }
      }}
    >
      {item.recipeImage || item.image ? (
        <Image
          source={{ uri: item.recipeImage || item.image }}
          style={styles.recipeImage}
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}
      <Text style={styles.recipeTitle}>
        {item.recipeName || item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Heading */}
      <View testID="FavoriteRecipes">
        <Text style={styles.title}>My Favorite Recipes</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Go back</Text>
      </TouchableOpacity>

      {/* Favorite Recipes List */}
      <FlatList
        data={favoriteRecipesList}
        keyExtractor={(item, index) => {
          if (item.idFood) {
            return item.idFood.toString();
          } else if (item.title) {
            return `custom-${item.title}-${index}`;
          } else {
            return index.toString();
          }
        }}
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280", // text-neutral-600
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 5,
    width: wp(40),
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: hp(2),
  },
  title: {
    fontSize: hp(3.8),
    marginTop: hp(2),
    marginLeft: 20,
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: "row",
    marginBottom: hp(2),
    backgroundColor: "white",
    padding: wp(4),
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: "center",
  },
  recipeImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  noImageContainer: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#6B7280",
    fontSize: hp(2),
  },
  recipeTitle: {
    fontSize: hp(2.2),
    fontWeight: "bold",
    color: "#4B5563",
  },
  listContentContainer: {
    paddingBottom: hp(4),
  },
});
