import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddVehicleScreen({ navigation }: any) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  const [mileage, setMileage] = useState('');

  const handleSave = async () => {
    if (!brand || !model || !year || !plate || !mileage) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const newVehicle = {
      id: Date.now(),
      brand,
      model,
      year,
      plate,
      mileage,
    };

    try {
      const storedVehicles = await AsyncStorage.getItem('@vehicles');
      const vehicles = storedVehicles ? JSON.parse(storedVehicles) : [];
      const updatedVehicles = [...vehicles, newVehicle];

      await AsyncStorage.setItem('@vehicles', JSON.stringify(updatedVehicles));

      Alert.alert('Sucesso', 'Veículo cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o veículo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Marca</Text>
      <TextInput
        value={brand}
        onChangeText={setBrand}
        placeholder="Ex: Honda"
        style={styles.input}
      />

      <Text style={styles.label}>Modelo</Text>
      <TextInput
        value={model}
        onChangeText={setModel}
        placeholder="Ex: Civic"
        style={styles.input}
      />

      <Text style={styles.label}>Ano</Text>
      <TextInput
        value={year}
        onChangeText={setYear}
        placeholder="Ex: 2019"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Placa</Text>
      <TextInput
        value={plate}
        onChangeText={setPlate}
        placeholder="Ex: ABC1D23"
        style={styles.input}
      />

      <Text style={styles.label}>Quilometragem Atual</Text>
      <TextInput
        value={mileage}
        onChangeText={setMileage}
        placeholder="Ex: 45000"
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fafe',
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
