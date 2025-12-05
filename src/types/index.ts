export * from './user';
export * from './product';
export * from './order';


export type Paginated<T> = {
  items: T[];
  limit: number;
  page: number;
  totalItems: number;
  totalPages: number;
};