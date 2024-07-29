import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SkeletonBody from '@/components/Main/SkeletonBody';
import DataBody from '@/components/Main/DataBody';

export default function MainTable() {
  const { searchResults, highlight, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  if (error) {
    return (
      <p>An error occurred while fetching data. Please try again later.</p>
    );
  }

  return (
    <Table>
      <TableCaption className={searchResults.length > 0 ? 'border-t' : ''}>
        {searchResults.length > 0 ? (
          <>
            Found <span>{searchResults.length}</span> Results
          </>
        ) : (
          'No Results Found'
        )}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>City</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Birthday</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <SkeletonBody />
        ) : (
          <DataBody searchResults={searchResults} highlight={highlight} />
        )}
      </TableBody>
    </Table>
  );
}
