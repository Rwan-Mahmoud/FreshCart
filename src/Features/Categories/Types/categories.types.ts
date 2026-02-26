// Category Item Type
export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// Metadata Type
export interface ICategoriesMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

// Categories Response Type
export interface ICategoriesResponse {
  results: number;
  metadata: ICategoriesMetadata;
  data: ICategory[];
}


export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface SubCategoriesResponse {
  results: number;
  metadata: PaginationMetadata;
  data: SubCategory[];
}