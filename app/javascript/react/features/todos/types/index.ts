export interface Item {
  id: number;
  title: string;
  content: string;
  category: string;
  assignee: string;
  position: number;
  category_id: number;
}

export interface Category {
  id: number;
  name: string;
}