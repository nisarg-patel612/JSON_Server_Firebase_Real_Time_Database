import logo from './logo.svg';
import './App.css';
import UserTable from './Task_1/Public_Api';
import JsonServerApp from './Task_1/Methods';
import Authentication from './Task_2/CRUD';
import CRUD from './Task_3/Loading_Spinners';

function App() {
  return (

    <>
      <h1>Task - 1 Display a List of Users</h1>
      <UserTable />

      <h1>Task - 1 User of Method Get,Post,Put,Delete & Patch</h1>
      <JsonServerApp />    

      <h1>Task - 2 CRUD & Authentication with Firebase API</h1>
      <Authentication />

      <h1>Task - 3 Display Loading Spinner while Data is being fetched</h1>
      <CRUD />
      
    </>
  );
}

export default App;
