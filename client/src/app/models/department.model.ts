import { Category } from "./category.model";

export interface Department {
  id: number,
  name: string,
  categories: Category[]
}


