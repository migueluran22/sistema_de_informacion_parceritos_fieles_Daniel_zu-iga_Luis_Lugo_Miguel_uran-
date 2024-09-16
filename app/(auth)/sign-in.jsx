import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { signIn } from '../../lib/appwrite';  // Importa la función de inicio de sesión

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const { email, password } = form;

    if (!email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Llamar a la función de signIn con las credenciales
      const session = await signIn(email, password);
      
      if (session) {
        Alert.alert('Login Exitoso');
        router.replace('/home');  // Navegar a la página principal si es exitoso
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error.message);
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={form.password}
          secureTextEntry
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isSubmitting}>
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
          <Text style={styles.link}>¿Aún no tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#150c2f', // Fondo suave para toda la aplicación
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ffff', // Fondo blanco translúcido para mejorar la legibilidad
    borderRadius: 10,
    marginTop: 260,
    margin: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#b0bb02',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#b0bb02',
    fontSize: 16,
  },
});

export default SignIn;
