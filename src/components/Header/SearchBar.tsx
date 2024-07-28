import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { AppDispatch } from '@/redux/store';
import { nameFilter } from '@/redux/slices/userSlice';
import useDebounce from '@/hooks/useDebounce';

export default function SearchBar() {
  // TODO: Insert an icon in search bar
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, 1000);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(nameFilter(debouncedQuery));
  }, [debouncedQuery]);

  function clearQuery() {
    setQuery('');
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search User"
        className="h-8"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button className="h-8" onClick={clearQuery}>
        Clear
      </Button>
    </div>
  );
}
