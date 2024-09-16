import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { createUser } from '../../lib/appwrite';  // Importa la función de creación de usuario

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',  // Cambiado a "email"
    usuario: '',
    contraseña: '',
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    const { email, usuario, contraseña } = form;

    if (!email || !usuario || !contraseña) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Pasar solo los campos necesarios a la función createUser
      const newUser = await createUser(email, contraseña, usuario);

      if (newUser) {
        Alert.alert("Registro Exitoso", "El usuario ha sido registrado correctamente.");
        router.replace('/sign-in');  // Redirigir al home tras registro exitoso
      }
    } catch (error) {
      console.error('Error durante el registro:', error.message);
      Alert.alert("Error", error.message);  // Muestra el error si algo sale mal
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Registrarse</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={form.usuario}
          onChangeText={(value) => setForm({ ...form, usuario: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={form.contraseña}
          secureTextEntry
          onChangeText={(value) => setForm({ ...form, contraseña: value })}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isSubmitting}>
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/sign-in')}>
          <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
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
    marginTop: 220,
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

export default SignUp;
