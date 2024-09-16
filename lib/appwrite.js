import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.sena.edu',
  projectId: '66dc9897000d66407938',
  databaseId: '66dca0190013cdb0862c',
  userCollectionId: '66dca07d00024c1bc0a1',
  videoCollectionId: '66dca0e3003adb044a1b',
  storageId: '66dca5420037f9d7d726'
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId)  // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Revisar si hay una sesión activa
export const checkSession = async () => {
  try {
    const session = await account.get();  // Revisa si existe alguna sesión activa
    return session ? true : false;  // Devuelve `true` si existe, `false` si no
  } catch (error) {
    console.log('No active session found.');
    return false;
  }
};

// Crear un nuevo usuario con los campos permitidos en la base de datos (username, email, avatar, accountId, password)
export const createUser = async (email, password, username) => {
  try {
    // Crear la cuenta del usuario con Appwrite
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    // Generar avatar basado en el nombre de usuario
    const avatarUrl = avatars.getInitials(username); // Crear un avatar básico

    // Crear el nuevo documento de usuario en la base de datos con los campos permitidos
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        username,        // Nombre de usuario
        email,           // Correo electrónico
        accountId: newAccount.$id,  // ID de la cuenta creada
        avatar: avatarUrl // URL del avatar generado
      }
    );

    // Devolver el nuevo usuario si todo fue exitoso
    return newUser;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw new Error(error.message || "Error desconocido al registrar el usuario.");
  }
};

// Iniciar sesión solo con credenciales válidas
export const signIn = async (email, password) => {
  try {
    // Verifica si ya existe una sesión activa
    const hasSession = await checkSession();
    if (hasSession) {
      console.log('Session already active, logging out first...');
      await account.deleteSession('current');  // Cerrar la sesión activa
    }

    // Crear una nueva sesión
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener el usuario actual
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
