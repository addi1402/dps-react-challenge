import './App.css';
import DPSLogo from './components/DPSLogo';
import UserTable from './components/UserTable';

export default function App() {
  return (
    <div id="container" className="flex flex-col place-items-center h-full">
      <DPSLogo />
      <UserTable />
    </div>
  );
}
