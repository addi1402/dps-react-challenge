import Dropdown from '@/components/Header/Dropdown';
import SearchBar from '@/components/Header/SearchBar';
import Tickbox from '@/components/Header/Tickbox';

export default function Header() {
  return (
    <header className="border-b p-6 pb-3 flex flex-col gap-6">
      <div>
        <h3 className="font-semibold">Accounts</h3>
        <p className="text-sm text-neutral-500">
          Access Comprehensive Customer Details
        </p>
      </div>
      <div className="flex justify-between items-center">
        <SearchBar />
        <div className="flex gap-4 items-center">
          <Dropdown />
          <Tickbox />
        </div>
      </div>
    </header>
  );
}
