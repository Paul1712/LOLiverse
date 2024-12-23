import React, { useEffect } from 'react';
import { Text, StyleSheet, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useJokesStore from '../state/useJokeStore';
import { ItemFavorite }  from '../components/ItemFavorite';

const FavoritesScreen = () => {
  const { favorites, loadFavorites, removeFavorite } = useJokesStore();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);
  
  const handleRemoveFavorite = (id) => {
    Alert.alert(
      "Confirm to Delete",
      "Are you sure you want to remove this favorite?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            removeFavorite(id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <LinearGradient
      colors={['#FFF', '#C9ff6acc']}
      style={styles.container}
    >
      <Text style={styles.title}>My Favorites♥️</Text>
      {favorites?.length === 0 ? 
        <Text style={styles.emptyText}>No favorites yet!👎</Text> 
        : 
        <FlatList
          data={favorites} 
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => (
            <ItemFavorite item={item} handleRemoveFavorite={handleRemoveFavorite} />
          )}
          contentContainerStyle={styles.listContainer}
        />}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#6c757d'
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default FavoritesScreen;
