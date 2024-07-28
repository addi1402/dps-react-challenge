import { useSelector, useDispatch } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RootState, AppDispatch } from '@/redux/store';
import { useMemo, useState } from 'react';
import { cityFilter } from '@/redux/slices/userSlice';

export default function Dropdown() {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.users);
  const [currentCity, setCurrentCity] = useState<string>('All Cities');

  const cities = useMemo(() => {
    const uniqueCities = [
      ...new Set(userData.map((user) => user.address.city)),
    ];
    return ['All Cities', ...uniqueCities].sort();
  }, [userData]);

  const handleCityChange = (city: string) => {
    setCurrentCity(city);
    dispatch(cityFilter(city === 'All Cities' ? '' : city));
  };

  return (
    <Select onValueChange={handleCityChange}>
      <SelectTrigger className="min-w-16 max-w-[130px]">
        <SelectValue placeholder={currentCity} />
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
