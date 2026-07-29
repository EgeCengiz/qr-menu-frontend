export interface MenuItem {
  id: number;
  name: string;
  desc: string;
  price: string;
  img: string;
  subCategory?: string;
  tags?: string[];
}

export interface SubCategory {
  id: string;
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
  subCategories?: SubCategory[];
  items: MenuItem[];
}

