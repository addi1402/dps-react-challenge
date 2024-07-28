import Header from './Header/Header';
import MainTable from './Main/MainTable';

export default function UserTable() {
  return (
    <div id="tableContainer" className="w-4/5 rounded-md border">
      <Header />
      <MainTable />
    </div>
  );
}
