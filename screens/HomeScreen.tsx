import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchCategories } from '../services/apiService';
import { ItemCategory } from '../components/ItemCategory';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCategories();
      if (data?.length === 0) {
        setError('No categories found. Try again later!');
      }
      setCategories(data);
    } catch (error) {
      setError('An error occurred while fetching categories.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('Joke by Category', { category });
  };

  return (
    <LinearGradient
      colors={['#FFF','#C9ff6acc']}
      style={styles.container}
    >
      <Text style={styles.title}>Categories 💬</Text>

      {loading && <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />}

      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <ItemCategory item={item} handleCategoryPress={handleCategoryPress} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </LinearGradient>
  );
};

export default HomeScreen;

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
    color: '#6c757d',
  },
  listContainer: {
    paddingBottom: 16,
  },
  loader: {
    marginVertical: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});
