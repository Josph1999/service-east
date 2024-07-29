export interface Query {
  rowsPerPage: string;

  page: string;

  searchText?: string;

  sortBy: string;

  direction: string;
}
