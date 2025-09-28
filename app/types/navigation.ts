export interface Topic {
  _id: string;
  title: string;
  slug: string;
}

export interface Subcategory {
  _id: string;
  title: string;
  slug: string;
  topics: Topic[];
}

export interface NavItem {
  _id: string;
  title: string;
  slug: string;
  subcategories: Subcategory[];
}
