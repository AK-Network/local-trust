const API_BASE = 'https://api.local-trust.ak-network.xyz';

export interface CreateRootCAParams {
  organization: string;
  countryCode: string;
  state: string;
  locality: string;
  validity: number;
}

export interface CreateCertParams {
  ca: {
    key: string;
    cert: string;
  };
  domains: string[];
  validity: number;
}

export const api = {
  async createRootCA(params: CreateRootCAParams) {
    const response = await fetch(`${API_BASE}/create/root`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to create root CA');
    }

    return response.json();
  },

  async createCert(params: CreateCertParams) {
    const response = await fetch(`${API_BASE}/create/cert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to create certificate');
    }

    return response.json();
  },
};