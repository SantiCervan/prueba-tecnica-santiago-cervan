import UserList from "./components/UserList";
import "antd/dist/reset.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className='header'>
        <img
          src="/logo-flexxus.png"
          alt="Flexxus Logo"
          style={{
            height: '50px',
          }}
        />
      </div>
      <UserList />
    </div>
  );
}

export default App;
