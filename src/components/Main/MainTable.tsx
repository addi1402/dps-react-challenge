import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: {
    city: string;
    state: string;
  };
  birthDate: string;
}

const MainTable: React.FC = () => {
  const { userData } = useSelector((state: RootState) => state.users);

  return (
    <Table>
      <TableCaption>
        <span>{userData.length}</span> Search Results
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
        {userData.map((user: User) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.address.city}</TableCell>
            <TableCell>{user.address.state}</TableCell>
            <TableCell>{user.birthDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MainTable;
