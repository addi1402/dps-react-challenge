import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { calculateOldestPerCity } from '@/redux/slices/userSlice';
import SkeletonBody from './SkeletonBody';
import DataBody from './DataBody';

const MainTable: React.FC = () => {
  const { searchResults, highlight, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (highlight) {
      dispatch(calculateOldestPerCity());
    }
  }, [dispatch, highlight]);

  if (error) {
    return (
      <p>An error occurred while fetching data. Please try again later.</p>
    );
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
        {loading ? (
          <SkeletonBody />
        ) : (
          <DataBody searchResults={searchResults} highlight={highlight} />
        )}
      </TableBody>
    </Table>
  );
};

export default MainTable;
