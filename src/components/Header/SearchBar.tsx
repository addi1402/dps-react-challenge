import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function SearchBar() {
  // TODO: Insert an icon in search bar
  return (
    <div className="flex gap-2">
      <Input placeholder="Search User" className="h-8" />
      <Button className="h-8">Clear</Button>
    </div>
  );
}
