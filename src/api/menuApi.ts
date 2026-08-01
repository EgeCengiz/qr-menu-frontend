function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && !envUrl.includes('localhost')) {
    return envUrl;
  }
  if (typeof window !== 'undefined' && window.location.hostname && window.location.hostname !== 'localhost') {
    return `http://${window.location.hostname}:3001/api`;
  }
  return envUrl || 'http://localhost:3001/api';
}

export function resolveMediaUrl(url?: string | null): string {
  if (!url) return '';
  const apiBase = getApiBaseUrl().replace(/\/api\/?$/, '');

  if (url.startsWith('/uploads')) {
    return `${apiBase}${url}`;
  }

  if (url.includes('/uploads/')) {
    const filename = url.substring(url.indexOf('/uploads/'));
    return `${apiBase}${filename}`;
  }

  return url;
}

export interface MenuItemApi {
  id: number;
  name: string;
  desc: string;
  price: string;
  img: string;
  subCategory?: string;
  tags?: string[];
  isAvailable?: boolean;
}

export interface SubCategoryApi {
  id: string;
  shortId: string;
  title: string;
  itemCount: string;
}

export interface CategoryApi {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  itemCount: string;
  img: string;
  videoUrl?: string | null;
  subCategories: SubCategoryApi[];
  items: MenuItemApi[];
}

export interface StoreSettingsApi {
  storeName: string;
  title: string;
  addressLine1: string;
  addressLine2: string;
  workingHours: string;
  breakfastWeekdays: string;
  breakfastWeekends: string;
  phone: string;
  phoneDisplay: string;
  googleMapsUrl: string;
  note: string;
}

export async function fetchCategories(): Promise<CategoryApi[]> {
  const res = await fetch(`${getApiBaseUrl()}/categories`);
  if (!res.ok) {
    throw new Error(`Menü yüklenemedi: HTTP ${res.status}`);
  }
  const data = await res.json() as CategoryApi[];
  return data;
}

export async function fetchWelcome(): Promise<{
  videoUrl: string | null;
  posterImg: string;
  title: string;
  subtitle: string;
  durationSeconds: number;
}> {
  const res = await fetch(`${getApiBaseUrl()}/welcome`);
  if (!res.ok) {
    throw new Error(`Welcome verisi yüklenemedi: HTTP ${res.status}`);
  }
  return res.json();
}

export async function fetchSettings(): Promise<StoreSettingsApi> {
  const res = await fetch(`${getApiBaseUrl()}/settings`);
  if (!res.ok) {
    throw new Error(`İletişim bilgileri yüklenemedi: HTTP ${res.status}`);
  }
  return res.json();
}

