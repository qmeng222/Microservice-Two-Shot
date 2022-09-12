import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './HatsList';
import HatForm from './HatForm';
import ListShoes from "./ListShoes";
import CreateShoes from "./CreateShoes";
import DeleteShoes from "./DeleteShoes";

function App(props) {
  if (props.shoes === undefined && props.hats === undefined) {
    return null;
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="hats">
            <Route index element={<HatsList hats={props.hats} />} />
            <Route path="new" element={<HatForm />} />
          </Route>        
          <Route path="shoes" element={<ListShoes shoes={props.shoes} />} />
          <Route path="shoes/create" element={<CreateShoes />} />
          <Route path="shoes/delete" element={<DeleteShoes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
