interface User {
  image: string | undefined;
  id: number;
  firstName: string;
  lastName: string;
  address: {
    city: string;
    state: string;
  };
  birthDate: string;
  isOldest?: boolean;
}

export default User;