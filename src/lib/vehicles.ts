export interface Vehicle {
    id: string;
    name: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: string;
    fuel: string;
    transmission: string;
    color: string;
    description: string;
    images: string[]; // Base64 data URLs
    createdAt: number;
}

const STORAGE_KEY = 'mahavithana_vehicles';

export function getVehicles(): Vehicle[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function saveVehicle(v: Vehicle): void {
    const all = getVehicles();
    all.unshift(v);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function deleteVehicle(id: string): void {
    const all = getVehicles().filter((v) => v.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('si-LK', {
        style: 'currency',
        currency: 'LKR',
        maximumFractionDigits: 0,
    }).format(price);
}

export const ADMIN_PASSWORD = 'mahavithana2025';
