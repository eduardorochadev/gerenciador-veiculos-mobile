import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vehicle } from '../types/vehicle'; // Crie esse type se ainda não tiver

const VEHICLE_KEY = '@vehicles';

export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const data = await AsyncStorage.getItem(VEHICLE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar veículos:', error);
    return [];
  }
}

export async function setVehicles(vehicles: Vehicle[]): Promise<void> {
  try {
    await AsyncStorage.setItem(VEHICLE_KEY, JSON.stringify(vehicles));
  } catch (error) {
    console.error('Erro ao salvar veículos:', error);
  }
}

export async function saveVehicle(vehicle: Vehicle): Promise<void> {
  const current = await getVehicles();
  const updated = [...current, vehicle];
  await setVehicles(updated);
}

export async function updateVehicle(index: number, updatedVehicle: Vehicle): Promise<void> {
  const current = await getVehicles();
  if (index >= 0 && index < current.length) {
    current[index] = updatedVehicle;
    await setVehicles(current);
  }
}

export async function deleteVehicle(index: number): Promise<void> {
  const current = await getVehicles();
  const updated = current.filter((_, i) => i !== index);
  await setVehicles(updated);
}
