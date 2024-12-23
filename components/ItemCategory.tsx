import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const ItemCategory = ({ item, handleCategoryPress }) => {
    return (
      <TouchableOpacity onPress={() => handleCategoryPress(item)}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryName}>{item}</Text>
          <Text style={styles.categoryDescription}>{`🃏 Jokes about ${item}`}</Text>
        </View>
      </TouchableOpacity>
    );
}  

  const styles = StyleSheet.create({
    categoryContainer: {
      padding: 16,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      marginBottom: 12,
      elevation: 3,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    categoryName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      textTransform: 'uppercase',
    },
    categoryDescription: {
      fontSize: 14,
      color: '#666',
    },
});