'use client';

import { useState, useEffect } from 'react';
import { addCollectionItem, updateCollectionItem } from '../lib/api';

const STATUS_OPTIONS = [
  'New in Box',
  'Unassembled',
  'Assembled',
  'Primed',
  'Painting in Progress',
  'Painted',
  'Based',
  'Completed',
];

export default function AddItemForm({
  onItemSaved,
  initialData,
}: {
  onItemSaved: () => void;
  initialData?: any;
}) {
  const [name, setName] = useState('');
  const [game, setGame] = useState('');
  const [faction, setFaction] = useState('');
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [quantity, setQuantity] = useState('1');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.Name || '');
      setGame(initialData.Game || '');
      setFaction(initialData.Faction || '');
      const statusValue =
        initialData.Status && typeof initialData.Status === 'object'
          ? initialData.Status.value
          : initialData.Status;
      setStatus(statusValue || STATUS_OPTIONS[0]);
      setQuantity(
        initialData.Quantity !== undefined
          ? String(initialData.Quantity)
          : '1'
      );
      setNotes(initialData.Notes || '');
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !game) return;

    if (initialData && initialData.id) {
      await updateCollectionItem(initialData.id, {
        Name: name,
        Game: game,
        Faction: faction,
        Status: status,
        Quantity: (() => {
          const q = parseInt(quantity, 10);
          return Number.isNaN(q) ? 1 : q;
        })(),
        Notes: notes,
      });
    } else {
      await addCollectionItem({
        Name: name,
        Game: game,
        Faction: faction,
        Status: status,
        Quantity: (() => {
          const q = parseInt(quantity, 10);
          return Number.isNaN(q) ? 1 : q;
        })(),
        Notes: notes,
      });
    }

    // Reset only if we're adding
    if (!initialData) {
      setName('');
      setGame('');
      setFaction('');
      setStatus(STATUS_OPTIONS[0]);
      setQuantity('1');
      setNotes('');
    }

    onItemSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border w-full p-2"
        placeholder="Miniature name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border w-full p-2"
        placeholder="Game"
        value={game}
        onChange={(e) => setGame(e.target.value)}
      />
      <input
        className="border w-full p-2"
        placeholder="Faction"
        value={faction}
        onChange={(e) => setFaction(e.target.value)}
      />
      <select
        className="border w-full p-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <input
        type="number"
        min={1}
        className="border w-full p-2"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <textarea
        className="border w-full p-2"
        rows={3}
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {initialData ? 'Save Changes' : 'Add Item'}
      </button>
    </form>
  );
}
