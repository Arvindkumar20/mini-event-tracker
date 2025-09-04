import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import EventForm from './pages/EventForm';
import ProtectedRoute from './routes/ProtectedRoute';
import ShareView from './pages/ShareView';
import { AuthProvider } from './hooks/useAuth';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<EventForm />} />
            <Route path="/edit" element={<EventForm />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/share/:shareId" element={<ShareView />} />
        </Routes>
     
      <div className='fixed bottom-2 right-2'>
         <ThemeToggle/>
      </div>
        
    
      </AuthProvider>
    </BrowserRouter>
  );
}
