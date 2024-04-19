import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      console.log(photo.uri); // Aquí puedes guardar la foto o manejarla como desees
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No tienes permiso para acceder a la cámara.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={(ref) => setCameraRef(ref)}
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
      />
      <TouchableOpacity onPress={takePicture} style={{ alignSelf: 'center', margin: 20 }}>
        <Text style={{ fontSize: 20 }}>Tomar Foto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;
