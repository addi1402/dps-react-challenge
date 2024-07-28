import { TableCell, TableRow } from '@/components/ui/table';
import User from '@/types/User';
import DataBodyProps from '@/types/Data';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function DataBody({ searchResults, highlight }: DataBodyProps) {
  return (
    <>
      {searchResults.map((user: User) => (
        <TableRow
          key={user.id}
          className={`transition-colors duration-300 ${
            highlight && user.isOldest ? 'bg-[#f4f4f4]' : 'bg-inherit'
          }`}
        >
          <TableCell className="font-medium pr-0">{user.id}</TableCell>
          <TableCell>
            <p className="font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-neutral-500 text-sm">{user.email}</p>
          </TableCell>
          <TableCell>{user.address.city}</TableCell>
          <TableCell className="pr-0">{user.address.state}</TableCell>
          <TableCell>{formatDate(user.birthDate)}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
