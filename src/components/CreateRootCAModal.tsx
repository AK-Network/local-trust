import React from 'react';
import { Modal } from './Modal';
import { CreateRootCA } from './CreateRootCA';

interface CreateRootCAModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRootCAModal: React.FC<CreateRootCAModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateRootCA onSuccess={onClose} onCancel={onClose} />
    </Modal>
  );
};