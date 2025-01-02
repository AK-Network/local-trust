import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { Button } from './Button';
import { db, ProjectCert } from '../lib/db';

interface EditCertificateProps {
  certificate: ProjectCert;
  onSuccess?: () => void;
}

export const EditCertificate: React.FC<EditCertificateProps> = ({
  certificate,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: certificate.name,
    description: certificate.description || '',
    email: certificate.email || '',
    organization: certificate.organization || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await db.put('projectCerts', {
      ...certificate,
      ...formData,
    });

    onSuccess?.();
  };

  return (
    <div className="space-y-4 h-screen sm:h-fit flex flex-col">
      <div className="flex items-center gap-3">
        <KeyRound className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Edit Certificate</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            id="name"
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description (optional)
          </label>
          <textarea
            id="description"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email (optional)
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
              Organization (optional)
            </label>
            <input
              id="organization"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.organization}
              onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
};