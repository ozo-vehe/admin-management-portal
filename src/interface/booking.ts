export interface Booking {
  day: string;
  agency_name: string;
  bl_number: string;
  phone: string;
  container_number: string [];
  invoice_number: string;
  command: string;
}

export interface BookingData {
  id: string;
  agency_name: string;
  command: string;
  bl_number: string;
  invoice_number: string;
  container_number: string[];
  day: string;
  status: string;
  phone: string;
  session_id: string;
}

export interface BookingSlots {
  commands: Slots[];
}

interface Slots {
  count: number
}



export interface ResultTemplate {
  status: number
  message: string
  container_number?: null | string
}
