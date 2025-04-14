import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ActionButton from '../components/ActionButton';

type Vehicle = {
  marca: string;
  modelo: string;
  ano: string;
  placa: string;
  quilometragem: string;
};

export default function AllVehiclesScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadVehicles = async () => {
      const data = await AsyncStorage.getItem('@vehicles');
      if (data) setVehicles(JSON.parse(data));
    };

    const unsubscribe = navigation.addListener('focus', loadVehicles);
    return unsubscribe;
  }, [navigation]);

  const deleteVehicle = async (index: number) => {
    Alert.alert('Excluir veículo', 'Tem certeza que deseja excluir este veículo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const updated = [...vehicles];
          updated.splice(index, 1);
          setVehicles(updated);
          await AsyncStorage.setItem('@vehicles', JSON.stringify(updated));
        },
      },
    ]);
  };

  const editVehicle = (vehicle: Vehicle, index: number) => {
    navigation.navigate('EditVehicle', { vehicle, index });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Todos os Veículos</Text>

      {vehicles.map((vehicle, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{vehicle.marca} {vehicle.modelo}</Text>
          <Text style={styles.cardText}>Ano: {vehicle.ano}</Text>
          <Text style={styles.cardSubtext}>Placa: {vehicle.placa}</Text>
          <Text style={styles.cardSubtext}>KM atual: {vehicle.quilometragem}</Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={() => editVehicle(vehicle, index)}>
              <Ionicons name="create-outline" size={24} color="#2563eb" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteVehicle(index)}>
              <Ionicons name="trash-outline" size={24} color="#dc2626" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <ActionButton label="Voltar" onPress={() => navigation.navigate('Home')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafe',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  cardText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '500',
  },
  cardSubtext: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
    marginTop: 12,
  },
});
