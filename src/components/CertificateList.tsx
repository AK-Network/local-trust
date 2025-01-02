import React, { useEffect, useState } from 'react';
import { db, ProjectCert, RootCA } from '../lib/db';
import { CertificateActions } from './CertificateActions';
import { EditCertificateModal } from './EditCertificateModal';

interface CertificateListProps {
  onUpdate?: () => void;
}

export const CertificateList: React.FC<CertificateListProps> = ({ onUpdate }) => {
  const [certificates, setCertificates] = useState<ProjectCert[]>([]);
  const [rootCAs, setRootCAs] = useState<Map<number, RootCA>>(new Map());
  const [editingCert, setEditingCert] = useState<ProjectCert | null>(null);

  const loadData = async () => {
    const [certs, cas] = await Promise.all([
      db.getAll('projectCerts'),
      db.getAll('rootCAs'),
    ]);

    const caMap = new Map(cas.map(ca => [ca.id!, ca]));
    setRootCAs(caMap);
    setCertificates(certs);
    onUpdate?.();
  };

  useEffect(() => {
    loadData();
  }, []);

  const downloadCertificate = (cert: ProjectCert) => {
    // Download key
    const keyBlob = new Blob([cert.key], { type: 'text/plain' });
    const keyUrl = URL.createObjectURL(keyBlob);
    const keyLink = document.createElement('a');
    keyLink.href = keyUrl;
    keyLink.download = `${cert.name}.key`;
    keyLink.click();
    URL.revokeObjectURL(keyUrl);

    // Download certificate
    const certBlob = new Blob([cert.cert], { type: 'text/plain' });
    const certUrl = URL.createObjectURL(certBlob);
    const certLink = document.createElement('a');
    certLink.href = certUrl;
    certLink.download = `${cert.name}.crt`;
    certLink.click();
    URL.revokeObjectURL(certUrl);
  };

  return (
    <div className="space-y-4">
      {certificates.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No certificates created yet. Create your first certificate above.
        </p>
      ) : (
        <div className="grid gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{cert.name}</h3>
                  {cert.description && (
                    <p className="text-sm text-gray-600 mt-1">{cert.description}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    CA: {rootCAs.get(cert.rootCAId)?.organization}
                  </p>
                  {cert.organization && (
                    <p className="text-sm text-gray-500">
                      Organization: {cert.organization}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    Created: {new Date(cert.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Domains:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {cert.domains.map((domain) => (
                        <li key={domain}>{domain}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <CertificateActions
                  certificate={cert}
                  onDownload={downloadCertificate}
                  onEdit={() => setEditingCert(cert)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {editingCert && (
        <EditCertificateModal
          isOpen={true}
          onClose={() => setEditingCert(null)}
          certificate={editingCert}
          onCertificateUpdated={loadData}
        />
      )}
    </div>
  );
};