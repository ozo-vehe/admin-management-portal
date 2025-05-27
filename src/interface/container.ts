export interface Container {
  id: string
  container_no: string
  bl_no: string
  gated_in: string
  gated_out: string
}

export interface ContainerDetails {
  containers: Container[];
  receipt_number: string;
}

export interface AltContainer {
  bl_number: string;
  container_number: string;
  id: string | number;
  gate_in: string;
  gate_out: string;
}
