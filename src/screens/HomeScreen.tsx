import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Olá, bem-vindo de volta!</Text>
      <Text style={styles.subtitle}>Seu controle de manutenção está aqui.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próxima manutenção</Text>
        <Text style={styles.cardText}>Troca de óleo - 15/04/2025</Text>
        <Text style={styles.cardSubtext}>Veículo: Honda Civic 2019</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AddVehicle')}>
          <Ionicons name="car-sport-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>+ Veículo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AddMaintenance')}>
          <Ionicons name="build-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>+ Manutenção</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('VehicleList')}>
        <Text style={styles.secondaryText}>Ver todos os veículos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafe',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logo: {
    width: 160,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 30,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 5,
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
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 10,
  },
  secondaryText: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '500',
  },
});
