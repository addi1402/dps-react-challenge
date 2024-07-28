import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '../ui/skeleton';

export default function SkeletonBody() {
  return (
    <>
      {[...Array(10)].map((_, index) => (
        <TableRow key={index} className="transition-colors duration-300">
          <TableCell className="font-medium w-[85px]">
            <Skeleton className="w-4 h-4 rounded-md" /> {/* Adjusted for ID */}
          </TableCell>
          <TableCell>
            <div className="space-y-3 w-[255px]">
              <Skeleton className="w-[120px] h-4" /> {/* Adjusted for name */}
              <Skeleton className="w-[180px] h-3" /> {/* Adjusted for email */}
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="w-[80px] h-4" /> {/* Adjusted for city */}
          </TableCell>
          <TableCell>
            <Skeleton className="w-[100px] h-4" /> {/* Adjusted for state */}
          </TableCell>
          <TableCell>
            <Skeleton className="w-[80px] h-4" /> {/* Adjusted for date */}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
