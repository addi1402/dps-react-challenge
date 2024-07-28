import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '../ui/skeleton';

export default function SkeletonBody() {
  return (
    <>
      {[...Array(10)].map((_, index) => (
        <TableRow key={index} className="transition-colors duration-300">
          <TableCell className="font-medium w-[85px] pr-0">
            <Skeleton className="w-4 h-4 rounded-md" />
          </TableCell>
          <TableCell>
            <div className="space-y-3 w-[255px]">
              <Skeleton className="w-[120px] h-4" />
              <Skeleton className="w-[180px] h-3" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="w-[80px] h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[100px] h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[80px] h-4" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
