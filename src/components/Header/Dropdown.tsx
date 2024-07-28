import { useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RootState } from '@/redux/store';
import { useMemo } from 'react';

export default function Dropdown() {
  const { userData } = useSelector((state: RootState) => state.users);
  const cities = useMemo(() => {
    const uniqueCities = [
      ...new Set(userData.map((user) => user.address.city)),
    ];
    return ['All Cities', ...uniqueCities].sort();
  }, [userData]);

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All Cities" />
      </SelectTrigger>
      <SelectContent>
        {cities.map((city) => (
          <SelectItem key={city} value={city}>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
