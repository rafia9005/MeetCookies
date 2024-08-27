import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1f2335] text-[#a9b1d6]">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </div>
  )
}

