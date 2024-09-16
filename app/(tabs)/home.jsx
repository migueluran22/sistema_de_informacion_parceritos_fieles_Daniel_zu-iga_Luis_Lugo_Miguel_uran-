import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar el menú desplegable

  const handleNavigate = (route) => {
    router.push(route); // Cambia esta función para navegar a diferentes rutas
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* NavBar */}
      <View style={styles.navbar}>
        {/* Logo de la empresa */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/img/logo.png')} // Reemplaza con la URL de tu logo o con un archivo local
            style={styles.logo}
          />
        </View>

        {/* Menú desplegable */}
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuButton}>
            <Text style={styles.menuText}>Menú</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal para el menú desplegable */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable style={styles.modalItem} onPress={() => handleNavigate('/profile.jsx')}>
              <Text style={styles.modalText}>Perfil</Text>
            </Pressable>
            <Pressable style={styles.modalItem}>
              <Text style={styles.modalText}>Registrar Mascota</Text>
            </Pressable>
            <Pressable style={styles.modalItem}>
              <Text style={styles.modalText}>Crear Reserva</Text>
            </Pressable>
            <Pressable style={styles.modalItem}>
              <Text style={styles.modalText}>Crear Queja</Text>
            </Pressable>
            <Pressable style={styles.modalItem}>
              <Text style={styles.modalText}>Cerrar sesión</Text>
            </Pressable>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Contenido de la página */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Bienvenido a la página de inicio</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    marginTop: 25
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#150c2f',
    paddingHorizontal: 10,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  menuContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#b0bb02',
    borderRadius: 5,
  },
  menuText: {
    color: '#ffff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalItem: {
    marginVertical: 10,
  },
  modalText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#b0bb02',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    color: '#333',
  },
});

export default Home;
