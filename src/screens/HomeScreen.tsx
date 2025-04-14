import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Vehicle = {
  marca: string;
  modelo: string;
  ano: string;
  placa: string;
  quilometragem: string;
};

export default function HomeScreen({ navigation }: any) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const loadVehicles = async () => {
      const jsonValue = await AsyncStorage.getItem('@vehicles');
      if (jsonValue != null) {
        setVehicles(JSON.parse(jsonValue));
      }
    };

    const unsubscribe = navigation.addListener('focus', loadVehicles);
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Olá, Eduardo</Text>
      <Text style={styles.subtitle}>Seu controle de manutenção está aqui.</Text>

      <Image
        source={require('../../assets/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>Veículos cadastrados</Text>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={300}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.cardScrollContent}
        style={styles.cardScroll}
      >
        {vehicles.length === 0 ? (
          <Text style={{ color: '#64748b', fontSize: 16 }}>Nenhum veículo cadastrado.</Text>
        ) : (
          vehicles.map((vehicle, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{vehicle.marca} {vehicle.modelo}</Text>
              <Text style={styles.cardText}>Ano: {vehicle.ano}</Text>
              <Text style={styles.cardSubtext}>Placa: {vehicle.placa}</Text>
              <Text style={styles.cardSubtext}>KM atual: {vehicle.quilometragem}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Botões de ação */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AddVehicle')}>
          <Ionicons name="car-sport-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AddMaintenance')}>
          <Ionicons name="build-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AllVehicles')}>
        <Ionicons name="list-circle-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}></Text>
      </TouchableOpacity>
      </View>
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
    width: 150,
    height: 150,
    marginBottom: 5,
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
    marginBottom: 10,
  },
  cardScroll: {
    width: '100%',
    marginBottom: 30,
  },
  cardScrollContent: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    width: 280,
    marginHorizontal: 10,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
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
    marginBottom: 30,
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
