// Brand individual type
export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// Metadata type
export interface IMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

// Brand API response type
export interface IBrandResponse {
  results: number;
  metadata: IMetadata;
  data: IBrand[];
}