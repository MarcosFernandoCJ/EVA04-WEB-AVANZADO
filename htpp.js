// Función que simula obtener datos de usuario
const getUserData = (userId) => {
    return new Promise((resolve, reject) => {
      // Simulación de llamada asíncrona a una base de datos o API
      setTimeout(() => {
        if (userId > 0) {
          resolve({
            id: userId,
            name: "Usuario " + userId,
            email: `usuario${userId}@example.com`
          });
        } else {
          reject(new Error("ID de usuario inválido"));
        }
      }, 1000);
    });
  };
  
  // Función para procesar datos
  const processUserData = (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const processedData = {
          ...userData,
          lastAccess: new Date().toISOString()
        };
        resolve(processedData);
      }, 500);
    });
  };
  
  // Versión con async/await
  const handleUserDataAsync = async (userId) => {
    try {
      console.log("Obteniendo datos del usuario...");
      const userData = await getUserData(userId);
      
      console.log("Procesando datos...");
      const processedData = await processUserData(userData);
      
      console.log("Datos procesados con éxito:", processedData);
      return processedData;
    } catch (error) {
      console.error("Error al procesar los datos:", error.message);
      throw error;
    }
  };
  
  // Ejecutar la función
  handleUserDataAsync(123)
    .then(result => console.log("Operación completada:", result))
    .catch(err => console.error("Error en la operación:", err.message));
  
  // También podemos mantener la versión con promesas encadenadas para comparar
  console.log("Versión con promesas encadenadas:");
  getUserData(123)
    .then(userData => {
      console.log("Datos del usuario obtenidos:", userData);
      return processUserData(userData);
    })
    .then(processedData => {
      console.log("Datos procesados con éxito:", processedData);
      return processedData;
    })
    .catch(error => {
      console.error("Error:", error.message);
    });