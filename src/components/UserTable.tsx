import Header from './Header/Header';
import MainTable from './Main/MainTable';

export default function UserTable() {
  return (
    <div id="tableContainer" className="w-11/12 rounded-xl border">
      <Header />
      <MainTable />
    </div>
  );
}
