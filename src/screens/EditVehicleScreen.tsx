import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import ActionButton from '../components/ActionButton';
import { updateVehicle } from '../utils/storage';
import { Vehicle } from '../types/vehicle';

type RouteParams = {
  params: {
    vehicle: Vehicle;
    index: number;
  };
};

export default function EditVehicleScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'params'>>();

  const [vehicle, setVehicle] = useState<Vehicle>({
    marca: '',
    modelo: '',
    ano: '',
    placa: '',
    quilometragem: '',
  });

  useEffect(() => {
    if (route.params?.vehicle) {
      setVehicle(route.params.vehicle);
    }
  }, [route.params]);

  const handleChange = (key: keyof Vehicle, value: string) => {
    setVehicle({ ...vehicle, [key]: value });
  };

  const handleUpdate = async () => {
    if (!vehicle.marca || !vehicle.modelo || !vehicle.placa) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
      return;
    }

    await updateVehicle(route.params.index, vehicle);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Veículo</Text>

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
        <ActionButton label="Atualizar" icon="checkmark-done" onPress={handleUpdate} />
        <ActionButton label="Cancelar" icon="close-circle-outline" onPress={handleCancel} color="#64748b" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e293b',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
