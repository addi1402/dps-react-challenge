import Dropdown from './Dropdown';
import SearchBar from './SearchBar';
import Tickbox from './Tickbox';

export default function Header() {
  return (
    <header className="border-b p-4 flex flex-col gap-3">
      <div>
        <h3 className="font-semibold text-lg">User Details</h3>
        <p className="text-sm text-neutral-500">Manage Your Customer Data</p>
      </div>
      <div className="flex justify-between">
        <SearchBar />
        <div className="flex gap-4">
          <Dropdown />
          <Tickbox />
        </div>
      </div>
    </header>
  );
}
