import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { URLProvider } from './contexts/URLContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import History from './pages/History';
import Analytics from './pages/Analytics';
import NotFound from './pages/NotFound';
import ShortRedirect from './pages/ShortRedirect';

function App() {
  return (
    <DarkModeProvider>
      <URLProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/analytics/:id" element={<Analytics />} />
              <Route path=":short" element={<ShortRedirect />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </URLProvider>
    </DarkModeProvider>
  );
}

export default App;