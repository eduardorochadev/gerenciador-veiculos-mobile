import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from '../components/ActionButton';
import { saveVehicle } from '../utils/storage';
import { Vehicle } from '../types/vehicle';

export default function AddVehicleScreen() {
  const navigation = useNavigation();

  const [vehicle, setVehicle] = useState<Vehicle>({
    marca: '',
    modelo: '',
    ano: '',
    placa: '',
    quilometragem: '',
  });

  const handleChange = (key: keyof Vehicle, value: string) => {
    setVehicle({ ...vehicle, [key]: value });
  };

  const handleSave = async () => {
    if (!vehicle.marca || !vehicle.modelo || !vehicle.placa) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
      return;
    }

    await saveVehicle(vehicle);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Veículo</Text>

      {(Object.keys(vehicle) as (keyof Vehicle)[]).map((field) => (
        <TextInput
          key={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={vehicle[field]}
          onChangeText={(text) => handleChange(field, text)}
          style={styles.input}
        />
      ))}

      <View style={styles.buttonRow}>
        <ActionButton label="Salvar" icon="checkmark-circle-outline" onPress={handleSave} />
        <ActionButton label="Cancelar" icon="close-circle-outline" onPress={handleCancel} color="#64748b" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f1f5f9',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderColor: '#e2e8f0',
    borderWidth: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    justifyContent: 'space-between',
  },
});
