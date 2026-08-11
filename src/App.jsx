import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './core/Layout.jsx';
import Home from './features/home/Home.jsx';
import Contact from './features/contact/Contact.jsx';
import Playground from './features/playground/Playground.jsx';
import Piracy from './features/piracy/Piracy.jsx';
import Secret from './features/secret/Secret.jsx';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/piracy" element={<Piracy />} />
          <Route path="/secret" element={<Secret />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
