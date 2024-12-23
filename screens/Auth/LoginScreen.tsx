import React, { useState, useEffect } from "react";
import { Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthStore from "../../state/useAuthStore";
import { registerForPushNotificationsAsync, scheduleJokeNotification } from "../../services/notificationService";
import { fetchRandomJoke } from "../../services/apiService";
import { LinearGradient } from 'expo-linear-gradient';

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        await registerForPushNotificationsAsync();
      } catch (error) {
        console.log("Error setting up notifications:", error);
      }
    };

    setupNotifications();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await login(data?.email, data?.password);

      const joke = await fetchRandomJoke();
      await scheduleJokeNotification(joke);

      Alert.alert("Joke of the Day! 💭", joke);
    } catch (error) {
      Alert.alert("Error", error?.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#FFF','#C9ff6acc']}
      style={styles.container}
    >
      <Text style={styles.title} accessible={true} accessibilityLabel="Iniciar Sesión">
        LOL-iverse
      </Text>
      
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            accessible={true}
            accessibilityLabel="Email"
            accessibilityHint="Enter your email"
          />
        )}
      />
      {errors?.email && <Text style={styles.error}>{errors?.email?.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            accessible={true}
            accessibilityLabel="Password"
            accessibilityHint="Enter your password"
          />
        )}
      />
      {errors?.password && (
        <Text style={styles.error}>{errors?.password?.message}</Text>
      )}

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          accessible={true}
          accessibilityLabel="Loading..."
        />
      ) : (
        <Pressable
          style={[styles.button, { opacity: isLoading || Object.keys(errors).length > 0 ? 0.6 : 1 }]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading || Object.keys(errors).length > 0}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      )}

      <Button
        title="Sign Up"
        onPress={() => navigation.navigate("Register")}
        accessibilityLabel="Sign Up"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { 
    fontSize: 40, 
    marginBottom: 32, 
    textAlign: "center", 
    fontWeight: "bold",
    color: "#6c757d", 
    textShadowColor: "#B0A6A0",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    letterSpacing: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  error: { color: "red", marginBottom: 8 },
  button: {
    backgroundColor: '#007bff',
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LoginScreen;
