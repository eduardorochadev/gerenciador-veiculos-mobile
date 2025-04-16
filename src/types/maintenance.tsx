export type Maintenance = {
    tipo: string;
    data: string;
    quilometragem: string;
    valor: string;
    proximaTroca?: string;
    vehicleId: string;
  };
  
  export type MaintenanceForm = Omit<Maintenance, 'vehicleId'>;