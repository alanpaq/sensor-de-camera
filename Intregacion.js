import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Camera } from 'react-native-camera';
import Communications from 'react-native-communications';
import * as Location from 'expo-location';
import * as MailComposer from 'expo-mail-composer';
import * as SMS from 'expo-sms';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleCameraCapture = async () => {
    try {
      const { uri } = await this.camera.takePictureAsync();
      Alert.alert('Picture taken', uri);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendEmail = () => {
    MailComposer.composeAsync({
      recipients: ['example@example.com'],
      subject: 'Subject',
      body: 'Body'
    });
  };

  const handleSendSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(['1234567890'], 'Hello from Expo');
      if (result === SMS.SentStatus.Sent) {
        Alert.alert('SMS sent successfully');
      } else {
        Alert.alert('Failed to send SMS');
      }
    } else {
      Alert.alert('SMS is not available on this device');
    }
  };

  const handleMakeCall = () => {
    Communications.phonecall('1234567890', true);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const handleFormSubmit = () => {
    // Aquí puedes realizar operaciones CRUD relacionadas con el formulario
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={(ref) => {
          this.camera = ref;
        }}
      />

      <Button title="Capture Image" onPress={handleCameraCapture} />

      <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
        <Text>Send Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSendSMS}>
        <Text>Send SMS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleMakeCall}>
        <Text>Make Call</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <Text>Get Location</Text>
      </TouchableOpacity>

      {location && (
        <MapView style={styles.map} initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} />
        </MapView>
      )}

      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: 200,
    height: 200,
  },
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#DDDDDD',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  map: {
    width: '80%',
    height: 200,
  },
});

export default App;
