import React from 'react';
import { Modal } from './Modal';
import { EditCertificate } from './EditCertificate';
import { ProjectCert } from '../lib/db';

interface EditCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: ProjectCert;
  onCertificateUpdated: () => void;
}

export const EditCertificateModal: React.FC<EditCertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
  onCertificateUpdated,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <EditCertificate
        certificate={certificate}
        onSuccess={() => {
          onCertificateUpdated();
          onClose();
        }}
      />
    </Modal>
  );
};