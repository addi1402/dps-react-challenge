import { Checkbox } from '@/components/ui/checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { toggleHighlight } from '@/redux/slices/userSlice';

export default function Tickbox() {
  const dispatch = useDispatch<AppDispatch>();
  const { highlight } = useSelector((store: RootState) => store.users);

  function handleToggle(): void {
    dispatch(toggleHighlight());
    console.log(highlight);
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={highlight} onCheckedChange={handleToggle} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Oldest Per City
      </label>
    </div>
  );
}
