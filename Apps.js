
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Importar las vistas de las funcionalidades
import CamaraView from './CamaraView';
import ComunicacionesView from './ComunicacionesView';
import GeolocalizacionView from './GeolocalizacionView';
import AlmacenamientoView from './AlmacenamientoView';

const App = () => {
  const [currentView, setCurrentView] = useState('Principal');

  const renderView = () => {
    switch (currentView) {
      case 'Principal':
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Mi Aplicación</Text>
            <Button title="Cámara" onPress={() => setCurrentView('Cámara')} />
            <Button title="Comunicaciones" onPress={() => setCurrentView('Comunicaciones')} />
            <Button title="Geolocalización" onPress={() => setCurrentView('Geolocalización')} />
            <Button title="Almacenamiento" onPress={() => setCurrentView('Almacenamiento')} />
          </View>
        );
      case 'Cámara':
        return <CamaraView goBack={() => setCurrentView('Principal')} />;
      case 'Comunicaciones':
        return <ComunicacionesView goBack={() => setCurrentView('Principal')} />;
      case 'Geolocalización':
        return <GeolocalizacionView goBack={() => setCurrentView('Principal')} />;
      case 'Almacenamiento':
        return <AlmacenamientoView goBack={() => setCurrentView('Principal')} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderView()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;