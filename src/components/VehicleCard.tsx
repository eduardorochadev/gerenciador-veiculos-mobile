import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Vehicle } from '../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{vehicle.marca} {vehicle.modelo} {vehicle.ano}</Text>
      <Text style={styles.text}>Placa: {vehicle.placa}</Text>
      <Text style={styles.text}>KM: {vehicle.quilometragem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  text: {
    fontSize: 14,
    color: '#475569',
  },
});
