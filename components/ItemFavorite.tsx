import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const ItemFavorite = ({ item, handleRemoveFavorite }) => {
    return (
      <View style={styles.favoriteContainer}>
        <Text style={styles.favoriteName}>{item.value}</Text>
        <Text style={styles.favoriteDescription}>{`Category: ${item.categories?.[0] ?? ':)'}`}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFavorite(item.id)} 
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
}  

  const styles = StyleSheet.create({
    favoriteContainer: {
      padding: 16,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      marginBottom: 12,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      elevation: 3,
    },
    favoriteName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      textTransform: 'uppercase',
    },
    favoriteDescription: {
      fontSize: 14,
      color: '#666',
    },
    removeButton: {
      marginTop: 10,
      backgroundColor: '#e74c3c',
      padding: 8,
      borderRadius: 5,
      alignItems: 'center',
    },
    removeButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
});