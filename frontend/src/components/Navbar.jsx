import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import Container from './Container';
import { Auth } from '../lib/api';
import { useAuth } from '../hooks/useAuth';


export default function Navbar() {
  const navigate = useNavigate();
  const { authed, setAuthed } = useAuth();

  const logout = async () => {
    await Auth.logout();
    setAuthed(false);
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-zinc-950/70 border-b border-gray-100 dark:border-zinc-800">
      <Container>
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="font-semibold text-lg">🎟️ EventTracker</Link>
          <div className="flex gap-3 items-center">
            {authed ? (
              <>
                <Link to="/" className="text-sm hover:underline">Dashboard</Link>
                <Link to="/new" className="text-sm hover:underline">Create</Link>
               
                <Button onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm hover:underline">Login</Link>
                <Link to="/signup" className="text-sm hover:underline">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}