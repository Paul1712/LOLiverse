import React, { useState } from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FavoriteButton = ({ saveFavorite, isFavorite }) => {
  const handlePress = () => {
    if (!isFavorite) {
      saveFavorite();
      Alert.alert('Added to Fav', 'The joke has been added to your favorites.');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        disabled={isFavorite}
        style={({ pressed }) => [
          styles.button,
          isFavorite ? styles.buttonDisabled : styles.buttonEnabled,
          pressed && !isFavorite && styles.buttonPressed,
        ]}
      >
        <Icon
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={24}
          color={isFavorite ? 'red' : '#ffffff'}
        />
        <Text style={styles.buttonText}>
          {isFavorite ? 'Added to Fav' : 'Add to Fav'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonEnabled: {
    backgroundColor: '#007bff',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
  buttonPressed: {
    backgroundColor: '#0056b3',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 8, // Espaciado entre ícono y texto
  },
});

export default FavoriteButton;
