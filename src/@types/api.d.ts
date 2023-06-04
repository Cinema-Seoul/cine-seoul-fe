declare global {
  export interface WithPagination {
    page: number;
    size?: number;
    sortBy?: unknown;
    sortDir?: 'ASC' | 'DESC';
  }
}

export {};
