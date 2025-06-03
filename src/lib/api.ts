// src/lib/api.ts
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASEROW_BASE_URL!;
const API_TOKEN = process.env.NEXT_PUBLIC_BASEROW_API_TOKEN!;

// Fetch all collection items
export async function fetchCollection() {
  try {
    const res = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Token ${API_TOKEN}`
      }
    });
    return res.data.results;
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
}

// Add a new collection item
export async function addCollectionItem(item: Record<string, any>) {
  try {
    const res = await axios.post(BASE_URL, item, {
      headers: {
        Authorization: `Token ${API_TOKEN}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error adding collection item:", error);
    throw error;
  }
}
