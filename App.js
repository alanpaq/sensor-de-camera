import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [respuestas, setRespuestas] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const guardarRespuestas = () => {
    if (+edad >= 0) {
      setRespuestas([...respuestas, { nombre, apellido, edad: +edad }]);
      setNombre('');
      setApellido('');
      setEdad('');
    }
  };

  const editarRespuesta = index => {
    setEditingIndex(index);
    setNombre(respuestas[index].nombre);
    setApellido(respuestas[index].apellido);
    setEdad(respuestas[index].edad.toString());
  };

  const actualizarRespuesta = index => {
    const newRespuestas = [...respuestas];
    newRespuestas[index] = { nombre, apellido, edad: +edad };
    setRespuestas(newRespuestas);
    setEditingIndex(null);
  };

  const eliminarRespuesta = index => {
    const newRespuestas = [...respuestas];
    newRespuestas.splice(index, 1);
    setRespuestas(newRespuestas);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />
      <Button title="Guardar" onPress={guardarRespuestas} />

      {respuestas.map((respuesta, index) => (
        <View key={index} style={styles.respuestaContainer}>
          {editingIndex === index ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
              />
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={apellido}
                onChangeText={setApellido}
              />
              <TextInput
                style={styles.input}
                placeholder="Edad"
                value={edad}
                onChangeText={setEdad}
                keyboardType="numeric"
              />
              <View style={styles.botonesContainer}>
                <Button title="Actualizar" onPress={() => actualizarRespuesta(index)} color="#4CAF50" />
                <Button title="Cancelar" onPress={() => setEditingIndex(null)} color="#FFC107" />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.respuestaText}>
                Nombre: {respuesta.nombre}, Apellido: {respuesta.apellido}, Edad: {respuesta.edad}
              </Text>
              <View style={styles.botonesContainer}>
                <Button title="Editar" onPress={() => editarRespuesta(index)} color="#2196F3" />
                <Button
                  title="Eliminar"
                  color="#f44336"
                  onPress={() => eliminarRespuesta(index)}
                />
              </View>
            </>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 40,
    borderColor: '#2196F3',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  respuestaContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  respuestaText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333333',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Formulario;
