export interface NavItem {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  subcategories: Subcategory[];
  featured?: boolean; // For highlighting important categories
  icon?: string; // Optional icon name
}

export interface Subcategory {
  _id: string;
  title: string;
  slug: string;
  topics: Topic[];
  featured?: boolean;
}

export interface Topic {
  _id: string;
  title: string;
  slug: string;
}

// New type for grouped navigation
export interface NavGroup {
  title: string;
  categories: NavItem[];
}
