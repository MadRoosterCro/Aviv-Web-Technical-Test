const API_BASE = 'http://localhost:3000/dev';

export const fetchListings = async () => {
  const response = await fetch(`${API_BASE}/listings`);
  if (!response.ok) {
    throw new Error('Failed to fetch listings');
  }
  return response.json();
};

export const fetchPriceHistory = async (id: number) => {
  const response = await fetch(`${API_BASE}/listings/${id}/prices`);
  if (!response.ok) {
    throw new Error('Failed to fetch price history');
  }
  return response.json();
};

export const createListing = async (data: any) => {
  const response = await fetch(`${API_BASE}/listings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create listing');
  }
  return response.json();
};

export const updateListing = async (id: number, data: any) => {
  const response = await fetch(`${API_BASE}/listings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update listing');
  }
  return response.json();
};
