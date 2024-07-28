import { useEffect } from 'react';
import './App.css';
import DPSLogo from './components/DPSLogo';
import UserTable from './components/UserTable';
import { fetchUsers } from './redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div id="container" className="flex flex-col place-items-center">
      <DPSLogo />
      <UserTable />
    </div>
  );
}
