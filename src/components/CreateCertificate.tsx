import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { Button } from './Button';
import { api } from '../lib/api';
import { db, RootCA } from '../lib/db';

interface CreateCertificateProps {
  selectedCA: RootCA;
  onSuccess?: () => void;
  onCertificateCreated?: () => void;
}

interface FormData {
  name: string;
  description: string;
  email: string;
  organization: string;
  domains: string[];
  validity: number;
}

export const CreateCertificate: React.FC<CreateCertificateProps> = ({
  selectedCA,
  onSuccess,
  onCertificateCreated,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    email: '',
    organization: '',
    domains: [''],
    validity: 365,
  });

  const handleAddDomain = () => {
    setFormData(prev => ({
      ...prev,
      domains: [...prev.domains, ''],
    }));
  };

  const handleRemoveDomain = (index: number) => {
    setFormData(prev => ({
      ...prev,
      domains: prev.domains.filter((_, i) => i !== index),
    }));
  };

  const handleDomainChange = (index: number, value: string) => {
    setFormData(prev => {
      const newDomains = [...prev.domains];
      newDomains[index] = value;
      return { ...prev, domains: newDomains };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.createCert({
        ca: {
          key: selectedCA.key,
          cert: selectedCA.cert,
        },
        domains: formData.domains.filter(Boolean),
        validity: formData.validity,
      });

      await db.add('projectCerts', {
        ...formData,
        domains: formData.domains.filter(Boolean),
        ...response.certificate,
        rootCAId: selectedCA.id!,
        createdAt: new Date(),
      });

      onCertificateCreated?.();
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create certificate:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 h-screen sm:h-fit flex flex-col">
      <div className="flex items-center gap-3">
        <KeyRound className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Create Project Certificate</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Domains
          </label>
          {formData.domains.map((domain, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                required
                placeholder="example.local"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={domain}
                onChange={(e) => handleDomainChange(index, e.target.value)}
              />
              {formData.domains.length > 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleRemoveDomain(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleAddDomain}
          >
            Add Domain
          </Button>
        </div>

        <div>
          <label htmlFor="validity" className="block text-sm font-medium text-gray-700">
            Validity (days)
          </label>
          <input
            id="validity"
            type="number"
            required
            min="1"
            max="3650"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.validity}
            onChange={(e) => setFormData(prev => ({ ...prev, validity: parseInt(e.target.value) }))}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating...' : 'Create Certificate'}
        </Button>
      </form>
    </div>
  );
};