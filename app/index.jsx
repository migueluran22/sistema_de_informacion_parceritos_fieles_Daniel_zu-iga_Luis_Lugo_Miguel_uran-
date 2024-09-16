import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ImageBackground, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#161622" style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Sección del Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/img/logo.png')}  // Ruta de tu logo
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Sección Home */}
        <View style={styles.home}>
          <Text style={styles.homeTitle}>Bienvenidos a Parceritos Fieles</Text>
          <Text style={styles.homeSubtitle}>Descubre lo mejor que tenemos para ti.</Text>
        </View>

        {/* Imagen Centrada */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require('./assets/img/Imagen.jpg')}
            style={styles.image}
            imageStyle={{ borderRadius: 10 }}  // Redondea los bordes de la imagen
          />
        </View>

        {/* Sección del Botón */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.btn} onPress={() => router.push('/sign-in')}>
            <Text style={styles.btnText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#150c2f', // Fondo suave para toda la aplicación
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 60,
    justifyContent: 'center',  // Centra verticalmente el contenido en el scroll
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,  // Espacio arriba y abajo del logo
  },
  logo: {
    marginTop: 20,
    width: 100, // Ajusta el ancho del logo según sea necesario
    height: 70, // Ajusta la altura del logo según sea necesario
    borderRadius: 75, // Radio del borde redondeado (más redondeado)
  },
  home: {
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  homeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  homeSubtitle: {
    fontSize: 18,
    color: '#ffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',  // Centra la imagen horizontalmente
    marginVertical: 20,    // Margen superior e inferior
  },
  image: {
    width: '100%',       // Ancho completo
    height: 280,         // Ajusta la altura según sea necesario
    justifyContent: 'center',
    opacity: 0.8,
    marginTop: -10
  },
  buttonSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    backgroundColor: '#b0bb02',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
