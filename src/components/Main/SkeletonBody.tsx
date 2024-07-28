import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '../ui/skeleton';

export default function SkeletonBody() {
  return (
    <>
      {[...Array(15)].map((_, index) => (
        <TableRow key={index} className="transition-colors duration-300">
          <TableCell>
            <Skeleton className="w-5 h-5" />
          </TableCell>
          <TableCell className='w-[100px]'>
            <Skeleton className="w-6 h-6 rounded-full" />
          </TableCell>
          <TableCell className='w-[180px]'>
            <Skeleton className="w-full h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-3/4 h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-3/4 h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-3/4 h-4" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
