export interface MenuItem {
  id: number;
  name: string;
  desc: string;
  price: string;
  img: string;
  subCategory?: string;
  tags?: string[];
  isAvailable?: boolean;
}

export interface SubCategory {
  id: string;
  shortId?: string;
  title: string;
  itemCount: string;
}

export interface Category {
  id: string;
  num: string;
  subtitle: string;
  title: string;
  itemCount: string;
  img: string;
  videoUrl?: string | null;
  subCategories?: SubCategory[];
  items: MenuItem[];
}
