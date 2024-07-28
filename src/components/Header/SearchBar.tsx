import { useDispatch } from 'react-redux';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { AppDispatch } from '@/redux/store';
import { nameFilter } from '@/redux/slices/userSlice';
import useDebounce from '@/hooks/useDebounce';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export default function SearchBar() {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, 1000);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(nameFilter(debouncedQuery));
  }, [debouncedQuery]);

  return (
    <div className="flex gap-2">
      <div className="relative ml-auto flex-1 md:grow-0">
        <MagnifyingGlassIcon className="absolute left-2.5 top-2 h-5 text-neutral-400 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px] min-w-[105px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
