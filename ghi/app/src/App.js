import Nav from "./Nav";
import MainPage from "./MainPage";
import ListShoes from "./ListShoes";
import CreateShoes from "./CreateShoes";
import DeleteShoes from "./DeleteShoes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(props) {
  if (props.shoes === undefined) {
    return null;
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="shoes" element={<ListShoes shoes={props.shoes} />} />
          <Route path="shoes/create" element={<CreateShoes />} />
          <Route path="shoes/delete" element={<DeleteShoes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
