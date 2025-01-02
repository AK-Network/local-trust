import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { Button } from './Button';
import { api } from '../lib/api';
import { db } from '../lib/db';

interface CreateRootCAProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CreateRootCA: React.FC<CreateRootCAProps> = ({ onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    organization: '',
    countryCode: '',
    state: '',
    locality: '',
    validity: 365,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.createRootCA(formData);
      await db.add('rootCAs', {
        ...formData,
        ...response.certificate,
        createdAt: new Date(),
      });
      
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create root CA:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 h-screen sm:h-fit flex flex-col">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Create Root Certificate Authority</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Organization</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.organization}
            onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Country Code</label>
            <input
              type="text"
              required
              maxLength={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.countryCode}
              onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value.toUpperCase() }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.state}
              onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Locality</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.locality}
              onChange={(e) => setFormData(prev => ({ ...prev, locality: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Validity (days)</label>
            <input
              type="number"
              required
              min="1"
              max="3650"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.validity}
              onChange={(e) => setFormData(prev => ({ ...prev, validity: parseInt(e.target.value) }))}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Root CA'}
          </Button>
        </div>
      </form>
    </div>
  );
};