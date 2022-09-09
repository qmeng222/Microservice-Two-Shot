import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './HatsList';
import HatForm from './HatForm';

function App(props) {


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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
