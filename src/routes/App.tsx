import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "../components/SearchBar";
import "./App.css";
import Header from "../components/Header";

function App() {
  return (
    <body className="body-listado">
      <div>
        <Header></Header>
       </div>
      <div className="Content">
      <SearchBar></SearchBar>
      </div>
      
    </body>
  );
}

export default App;
