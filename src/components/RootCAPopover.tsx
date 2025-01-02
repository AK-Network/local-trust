import React, { useState } from 'react';
import { Shield, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { CreateRootCAModal } from './CreateRootCAModal';
import { RootCA } from '../lib/db';

interface RootCAPopoverProps {
  rootCAs: RootCA[];
  selectedCA: RootCA | null;
  onSelectCA: (ca: RootCA) => void;
}

export const RootCAPopover: React.FC<RootCAPopoverProps> = ({ rootCAs, selectedCA, onSelectCA }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Shield className="w-4 h-4" />
        {selectedCA ? selectedCA.organization : 'Select Root CA'}
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
          <div className="space-y-2">
            {rootCAs.map((ca) => (
              <button
                key={ca.id}
                onClick={() => {
                  onSelectCA(ca);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 ${
                  selectedCA?.id === ca.id ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <div className="font-medium">{ca.organization}</div>
                <div className="text-sm text-gray-500">
                  {ca.locality}, {ca.state}, {ca.countryCode}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={() => {
                setShowCreateModal(true);
                setIsOpen(false);
              }}
            >
              Create New Root CA
            </Button>
          </div>
        </div>
      )}

      <CreateRootCAModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};