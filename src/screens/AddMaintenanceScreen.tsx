import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

type Vehicle = {
  id: string;
  marca: string;
  modelo: string;
  placa: string;
};

export default function AddMaintenanceScreen({ navigation }: any) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [data, setData] = useState('');
  const [quilometragem, setQuilometragem] = useState('');
  const [valor, setValor] = useState('');
  const [proximaTroca, setProximaTroca] = useState('');

  useEffect(() => {
    const loadVehicles = async () => {
      const json = await AsyncStorage.getItem('@vehicles');
      if (json) {
        setVehicles(JSON.parse(json));
      }
    };
    loadVehicles();
  }, []);

  const handleSave = async () => {
    if (!selectedVehicle || !data || !quilometragem || !valor) {
      Alert.alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const newMaintenance = {
      tipo: 'Troca de Óleo',
      data,
      quilometragem,
      valor,
      proximaTroca,
      vehicleId: selectedVehicle,
    };

    const stored = await AsyncStorage.getItem('@maintenances');
    const prev: any[] = stored ? JSON.parse(stored) : [];
    prev.push(newMaintenance);

    await AsyncStorage.setItem('@maintenances', JSON.stringify(prev));
    Alert.alert('Manutenção salva com sucesso!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Troca de Óleo</Text>

      <Text style={styles.label}>Veículo</Text>
      <Picker
        selectedValue={selectedVehicle}
        onValueChange={(itemValue) => setSelectedVehicle(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione um veículo" value="" />
        {vehicles.map((v) => (
          <Picker.Item
            key={v.id}
            label={`${v.marca} ${v.modelo} (${v.placa})`}
            value={v.id}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Data da troca</Text>
      <TextInput
        placeholder="dd/mm/aaaa"
        style={styles.input}
        value={data}
        onChangeText={setData}
      />

      <Text style={styles.label}>Quilometragem</Text>
      <TextInput
        placeholder="Ex: 45000"
        keyboardType="numeric"
        style={styles.input}
        value={quilometragem}
        onChangeText={setQuilometragem}
      />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        placeholder="Ex: 120.00"
        keyboardType="numeric"
        style={styles.input}
        value={valor}
        onChangeText={setValor}
      />

      <Text style={styles.label}>Próxima troca estimada (opcional)</Text>
      <TextInput
        placeholder="Ex: 50000"
        keyboardType="numeric"
        style={styles.input}
        value={proximaTroca}
        onChangeText={setProximaTroca}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.cancel}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20 },
  label: { fontSize: 14, marginTop: 10, marginBottom: 4, color: '#334155' },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  cancel: {
    color: '#64748b',
    marginTop: 15,
    textAlign: 'center',
  },
});
