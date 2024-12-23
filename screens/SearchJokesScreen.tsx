import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { searchJokes } from '../services/apiService';

const SearchJokesScreen = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [query]);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);
    setJokes([]);

    try {
      const results = await searchJokes(query);
      if (results?.length === 0) {
        setError('No jokes found. Try a different keyword!');
      }
      setJokes(results);
    } catch (error) {
      setError('An error occurred while fetching jokes. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#FFF', '#C9ff6acc']}
      style={styles.container}
    >
      <Text style={styles.title}>Search Jokes 👀</Text>

      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search for a joke..."
      />

      <Button
        title="Search 🔍"
        onPress={handleSearch}
        disabled={!query || loading}
      />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
      
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={jokes}
        renderItem={({ item }) => (
          <View style={styles.jokeItem}>
            <Image source={{ uri: item?.icon_url }} style={styles.jokeImage} />
            <Text style={styles.jokeText}>{item?.value}</Text>
          </View>
        )}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={styles.listContainer}
      />
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
    color: '#6c757d',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  loader: {
    marginVertical: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  listContainer: {
    marginTop: 16,
    paddingBottom: 16,
  },
  jokeItem: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    alignItems: 'center',
  },
  jokeText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  jokeImage: {
    width: 50,
    height: 50,
    marginBottom: 16,
  },
  favoriteButtonEnabled: {
    backgroundColor: '#007bff',
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SearchJokesScreen;
