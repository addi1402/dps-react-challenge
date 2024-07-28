import { useEffect } from 'react';
import './App.css';
import DPSLogo from './components/DPSLogo';
import UserTable from './components/UserTable';
import {fetchUsers} from './redux/slices/userSlice';
import { useDispatch } from 'react-redux';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  },[dispatch]);

  return (
    <div id="container" className="flex flex-col place-items-center">
      <DPSLogo />
      <UserTable />
    </div>
  );
}
