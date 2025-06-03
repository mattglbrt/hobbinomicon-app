'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchCollection } from '../lib/api';
import CollectionItemCard from '../components/CollectionItemCard';
import AddItemForm from '../components/AddItemForm';
import Modal from '../components/Modal';
import DashboardShell from '../components/DashboardShell';

export const dynamic = 'force-dynamic';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/login');
    }
  }, [session, status, router]);
  const [collection, setCollection] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchCollection();
      setCollection(data);
    } catch (err) {
      console.error('Failed to load collection:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (session) {
      loadData();
    }
  }, [session]);

  // Group by Game
  const groupedByGame = collection.reduce((acc: Record<string, any[]>, item) => {
    const key = item.Game || 'Uncategorized';
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});

  // Summary info
  const totalEntries = collection.length;
  const totalModels = collection.reduce(
    (sum, item) => sum + (parseInt(item.Quantity as string, 10) || 0),
    0,
  );
  const completed = collection.reduce(
    (sum, item) => sum + (parseInt(item.Completed as string, 10) || 0),
    0,
  );

  return (
    <DashboardShell>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <p className="text-gray-600 text-sm">Tracking <strong>{totalModels}</strong> models across <strong>{totalEntries}</strong> entries —{' '}
          <strong>{completed}</strong> completed
        </p>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Miniature
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading your collection...</p>
      ) : collection.length === 0 ? (
        <p className="text-gray-500">No miniatures found. Add your first one!</p>
      ) : (
        Object.entries(groupedByGame).map(([game, group]) => {
          const items = group as any[];
          return (
            <div key={game} className="mb-8">
              <h2 className="text-xl font-bold mb-3">{game}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <CollectionItemCard
                    key={item.id}
                    item={item}
                    onItemUpdated={loadData}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <Modal onClose={() => setIsAddModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Add a New Miniature</h2>
          <AddItemForm
            onItemSaved={() => {
              setIsAddModalOpen(false);
              loadData();
            }}
          />
        </Modal>
      )}
    </DashboardShell>
  );
}
