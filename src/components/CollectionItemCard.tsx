'use client';

import { useState } from 'react';
import Modal from './Modal';
import AddItemForm from './AddItemForm';

function DetailRow({ label, value }: { label: string; value: any }) {
  const displayValue =
    value && typeof value === 'object' ? value.value ?? '—' : value;
  return (
    <div className="text-sm text-gray-700">
      <span className="font-medium">{label}:</span> {displayValue || '—'}
    </div>
  );
}

export default function CollectionItemCard({
  item,
  onItemUpdated,
}: {
  item: any;
  onItemUpdated: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaved = () => {
    setIsModalOpen(false);
    onItemUpdated();
  };

  return (
    <>
      <div
        className="bg-white shadow-md border border-gray-200 rounded-lg p-5 space-y-2 hover:shadow-lg transition cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <h3 className="text-xl font-semibold">{item.Name}</h3>
        <DetailRow label="Game" value={item.Game} />
        <DetailRow label="Faction" value={item.Faction} />
        <DetailRow label="Status" value={item.Status} />
        <DetailRow label="Quantity" value={item.Quantity} />
        {item.Notes && (
          <p className="text-sm text-gray-500 italic pt-1">{item.Notes}</p>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-semibold mb-4">Edit Item</h2>
          <AddItemForm initialData={item} onItemSaved={handleSaved} />
        </Modal>
      )}
    </>
  );
}
