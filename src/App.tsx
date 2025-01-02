import React, { useEffect, useState } from 'react';
import { Plus, ShieldCheck, FileKey } from 'lucide-react';
import { Button } from './components/Button';
import { CreateRootCA } from './components/CreateRootCA';
import { RootCAPopover } from './components/RootCAPopover';
import { CreateCertificateModal } from './components/CreateCertificateModal';
import { CertificateList } from './components/CertificateList';
import { db, RootCA } from './lib/db';

function App() {
  const [rootCAs, setRootCAs] = useState<RootCA[]>([]);
  const [selectedCA, setSelectedCA] = useState<RootCA | null>(null);
  const [showCreateCertModal, setShowCreateCertModal] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const loadRootCAs = async () => {
      const allRootCAs = await db.getAll('rootCAs');
      setRootCAs(allRootCAs);
      if (allRootCAs.length > 0 && !selectedCA) {
        setSelectedCA(allRootCAs[0]);
      }
    };
    loadRootCAs();
  }, [selectedCA]);

  const handleCertificateCreated = () => {
    setUpdateTrigger(prev => prev + 1);
  };

  if (rootCAs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <CreateRootCA />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">LocalTrust</h1>
            </div>
            <RootCAPopover
              rootCAs={rootCAs}
              selectedCA={selectedCA}
              onSelectCA={setSelectedCA}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileKey className="w-6 h-6 text-blue-600" />
            Your Certificates
          </h2>
          <Button
            onClick={() => setShowCreateCertModal(true)}
            className="flex items-center gap-2"
            disabled={!selectedCA}
          >
            <Plus className="w-4 h-4" />
            New Certificate
          </Button>
        </div>

        <CertificateList key={updateTrigger} />

        {selectedCA && (
          <CreateCertificateModal
            isOpen={showCreateCertModal}
            onClose={() => setShowCreateCertModal(false)}
            selectedCA={selectedCA}
            onCertificateCreated={handleCertificateCreated}
          />
        )}
      </main>
    </div>
  );
}

export default App;