import Header from '@/components/Header/Header';
import MainTable from '@/components/Main/MainTable';

export default function UserTable() {
  return (
    <div id="tableContainer" className="w-11/12 rounded-xl border mb-10">
      <Header />
      <MainTable />
    </div>
  );
}
