// import logo from './logo.svg';
import './App.css';
import EmployeeFinder from './employeeFinder';
import GetAll from './getAll';
import NewEmployee from './newEmployee';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Management System</h1>
        <h2>Find an employee by ID:</h2>
        <EmployeeFinder></EmployeeFinder>
        <h2>Employee Directory:</h2>
        <GetAll></GetAll>
        <h2>Add/Edit employee:</h2>
        <NewEmployee></NewEmployee>
      </header>
      <footer>
        <p>&copy; This website was created by Pedro Valente</p>
      </footer>
    </div>
  );
}

export default App;
