import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { calculateOldestPerCity } from '@/redux/slices/userSlice';

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

const MainTable: React.FC = () => {
  const { searchResults, highlight } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (highlight) {
      dispatch(calculateOldestPerCity());
    }
  }, [dispatch, highlight]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    <Table>
      <TableCaption>
        Results Found: <span>{searchResults.length}</span>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>City</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Birthday</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {searchResults.map((user: User) => (
          <TableRow
            key={user.id}
            className={
              highlight && user.isOldest ? 'bg-yellow-50' : 'bg-inherit'
            }
          >
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell className="font-medium">
              <Avatar className="w-6 h-auto">
                <AvatarImage src={user.image} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.address.city}</TableCell>
            <TableCell>{user.address.state}</TableCell>
            <TableCell>{formatDate(user.birthDate)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MainTable;
