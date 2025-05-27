export interface Agent {
  id: number
  name: string
  email: string
  phone: string
  profile: {
    id_type?: string
    id_number?: string
    agency_name?: string
    rc_number?: string
    reg_code?: string
    authority_doc?: string | null
  }
}

export interface AgentSignIn {
  email: string
  password: string
}

export interface AgentSignUp {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
}
