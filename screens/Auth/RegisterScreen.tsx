import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthStore from "../../state/useAuthStore";
import { LinearGradient } from 'expo-linear-gradient'; // Importamos el componente LinearGradient

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "The email must have a valid domain (e.g., .com, .org)"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "The password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Must confirm password"),
});

const RegisterScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const register = useAuthStore((state) => state.register);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await register(data?.email, data?.password, data?.name);
      console.log("Successfully registered:", data);

      Alert.alert("Successfully registered!", "You can now login.", [
        { text: "OK", onPress: redirectToLogin }
      ]);
    } catch (error) {
      Alert.alert("Error", error.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToLogin = () => {
    reset();
    navigation.navigate("Login");
  };

  return (
    <LinearGradient
    colors={['#FFF','#C9ff6acc']}
      style={styles.container}
    >
      <Text style={styles.title}>Create Account</Text>
      
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors?.name?.message}</Text>}

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
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors?.email?.message}</Text>}

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
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors?.password?.message}</Text>}

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors?.confirmPassword?.message}</Text>}

      <Pressable 
        style={[styles.button, { opacity: isLoading || Object.keys(errors).length > 0 ? 0.6 : 1 }]}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading || Object.keys(errors).length > 0}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Button title="I already have an account!" onPress={redirectToLogin} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    justifyContent: "center", 
    alignItems: 'center'
  },
  title: { fontSize: 24, marginBottom: 16, textAlign: "center", color: '#6c757d' },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
    width: '100%',
    backgroundColor: 'white'
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

export default RegisterScreen;
