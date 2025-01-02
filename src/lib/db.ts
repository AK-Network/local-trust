import { openDB } from 'idb';

const DB_NAME = 'local-trust-db';
const DB_VERSION = 1;

export interface RootCA {
  id?: number;
  organization: string;
  countryCode: string;
  state: string;
  locality: string;
  validity: number;
  cert: string;
  key: string;
  createdAt: Date;
}

export interface ProjectCert {
  id?: number;
  name: string;
  description?: string;
  email?: string;
  organization?: string;
  domains: string[];
  validity: number;
  cert: string;
  key: string;
  rootCAId: number;
  createdAt: Date;
}

export const db = await openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('rootCAs')) {
      const rootCAStore = db.createObjectStore('rootCAs', { keyPath: 'id', autoIncrement: true });
      rootCAStore.createIndex('organization', 'organization');
      rootCAStore.createIndex('createdAt', 'createdAt');
    }

    if (!db.objectStoreNames.contains('projectCerts')) {
      const projectCertStore = db.createObjectStore('projectCerts', { keyPath: 'id', autoIncrement: true });
      projectCertStore.createIndex('rootCAId', 'rootCAId');
      projectCertStore.createIndex('createdAt', 'createdAt');
    }
  },
});