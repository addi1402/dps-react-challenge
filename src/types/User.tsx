export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: {
    city: string;
    state: string;
  };
  birthDate: string;
  image: string | undefined;
  isOldest?: boolean;
  email:string;
}

export interface UserState {
  userData: User[];
  searchResults: User[];
  loading: boolean;
  error: string | null;
  currentFilters: {
    city: string;
    name: string;
  };
  highlight: boolean;
}
