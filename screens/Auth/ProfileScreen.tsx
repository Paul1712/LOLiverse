import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importar el LinearGradient
import useAuthStore from '../../state/useAuthStore';

const ProfileScreen = () => {
  const logout = useAuthStore((state) => state.logout);
  const { email, name } = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout(); 
  };

  return (
    <LinearGradient
      colors={['#FFF','#C9ff6acc']}
      style={styles.container}
    >
      <Text style={styles.title}>HI, {name}!👋</Text>
      <Text style={styles.userInfo}>👤 User: {email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#6c757d',
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: '#6c757d',
  },
});

export default ProfileScreen;
