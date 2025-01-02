import React, { useState } from 'react';
import { MoreVertical, Download, Pencil } from 'lucide-react';
import { Button } from './Button';
import { ProjectCert } from '../lib/db';

interface CertificateActionsProps {
  certificate: ProjectCert;
  onDownload: (cert: ProjectCert) => void;
  onEdit: (cert: ProjectCert) => void;
}

export const CertificateActions: React.FC<CertificateActionsProps> = ({
  certificate,
  onDownload,
  onEdit,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="!p-2"
      >
        <MoreVertical className="w-4 h-4" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
            <button
              onClick={() => {
                onDownload(certificate);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={() => {
                onEdit(certificate);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};