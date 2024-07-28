import { TableCell, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import User from '@/types/User';
import DataBodyProps from '@/types/Data';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export default function DataBody({ searchResults, highlight }: DataBodyProps) {
  return (
    <>
      {searchResults.map((user: User) => (
        <TableRow
          key={user.id}
          className={`transition-colors duration-300 ${
            highlight && user.isOldest ? 'bg-yellow-50' : 'bg-inherit'
          }`}
        >
          <TableCell className="font-medium">{user.id}</TableCell>
          <TableCell>
            <Avatar className="w-6 h-auto">
              <AvatarImage src={user.image} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </TableCell>
          <TableCell className="font-medium">
            {user.firstName} {user.lastName}
          </TableCell>
          <TableCell>{user.address.city}</TableCell>
          <TableCell>{user.address.state}</TableCell>
          <TableCell>{formatDate(user.birthDate)}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
