import React from 'react';
import { Modal } from './Modal';
import { CreateCertificate } from './CreateCertificate';
import { RootCA } from '../lib/db';

interface CreateCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCA: RootCA;
  onCertificateCreated: () => void;
}

export const CreateCertificateModal: React.FC<CreateCertificateModalProps> = ({
  isOpen,
  onClose,
  selectedCA,
  onCertificateCreated,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateCertificate 
        selectedCA={selectedCA} 
        onSuccess={onClose}
        onCertificateCreated={onCertificateCreated}
      />
    </Modal>
  );
};