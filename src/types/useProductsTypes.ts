export interface ISingleProduct {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface IInitialData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ISingleProduct[];
}

export interface IUseProducts {
  products: ISingleProduct[];
  filterId: number;
  error: string | null;
  page: number;
  fetchMore: () => void;
  fetchLess: () => void;
  setFilterId: (id: number) => void;
}
