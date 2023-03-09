// Dearest Father God, please glorify Your name through Domanda in every nation on the planet. 
// In Jesus' most powerful name, Amen

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import PlayP6English from './components/P6English/PlayP6English';
import Summary from './components/Summary/Summary';

function App () {

  return (
    <BrowserRouter> 
      <Routes>
        <Route path = "/" element = {<Home /> } />
        <Route path = "/p6English" element = {<PlayP6English /> } />
        <Route path = "/Summary" element = {<Summary />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;