import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, set, push, get } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

// Construir la configuración usando variables de entorno Vite (prefijo VITE_FIREBASE_)
// o, si no están disponibles (p. ej. abriendo index.html directamente), usar window.__FIREBASE_CONFIG como fallback.
const firebaseConfig = {
  apiKey: (import.meta && import.meta.env && import.meta.env.VITE_FIREBASE_API_KEY) || (window && window.__FIREBASE_CONFIG && window.__FIREBASE_CONFIG.apiKey) || null,
  authDomain: (import.meta && import.meta.env && import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) || (window && window.__FIREBASE_CONFIG && window.__FIREBASE_CONFIG.authDomain) || null,
  databaseURL: (import.meta && import.meta.env && import.meta.env.VITE_FIREBASE_DATABASE_URL) || (window && window.__FIREBASE_CONFIG && window.__FIREBASE_CONFIG.databaseURL) || null,
  projectId: (import.meta && import.meta.env && import.meta.env.VITE_FIREBASE_PROJECT_ID) || (window && window.__FIREBASE_CONFIG && window.__FIREBASE_CONFIG.projectId) || null,
  storageBucket: (import.meta && import.meta.env && import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) || (window && window.__FIREBASE_CONFIG && window.__FIREBASE_CONFIG.storageBucket) || null,
  messagingSenderId: (import.meta && import.meta.env && import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) || (window && window.__FIREBASE_CONFIG && window.__FIREBASE_CONFIG.messagingSenderId) || null,
  appId: (import.meta && import.meta.env && import.meta.env.VITE_FIREBASE_APP_ID) || (window && window.__FIREBASE_CONFIG && window.__FIREBASE_CONFIG.appId) || null,
};

// Inicializar solo si no hay apps ya inicializadas (evitar doble inicialización)
let app;
if (getApps && getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  // Si ya hay una app inicializada, usar la primera (esto evita errores al inicializar dos veces)
  app = getApps && getApps()[0];
}

const database = getDatabase(app);
const safevote = (productID) => {

  const votesRef = ref(database, 'votes');

  const newVoteRef = push(votesRef); 
  return set(newVoteRef, {
    productID: productID,
    timestamp: Date.now()
  })
  .then(() => {
    return {
      status: true,
      message: "Vote saved successfully"
    }
  })
  .catch((error) => {
    console.error("Error saving vote:", error);
    return {
      status: false,
      message: "Error saving vote"
    }
  })
};

// Función flecha asíncrona para obtener todos los votos de la colección 'votes'
const getVotes = async () => {
  try {
    // Obtener referencia a la colección 'votes'
    const votesRef = ref(database, 'votes');
    
    // Leer los datos una sola vez con get()
    const snapshot = await get(votesRef);
    
    // Verificar si existen datos
    if (snapshot.exists()) {
      return {
        status: true,
        data: snapshot.val()
      };
    } else {
      return {
        status: false,
        message: "No hay datos disponibles"
      };
    }
  } catch (error) {
    console.error("Error obteniendo votos:", error);
    return {
      status: false,
      message: "Error al obtener los datos"
    };
  }
};

export { safevote, getVotes };