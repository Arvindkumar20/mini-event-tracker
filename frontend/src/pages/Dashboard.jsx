import { useEffect, useState } from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import EventCard from '../components/EventCard';
import FilterTabs from '../components/FilterTabs';
import { Events } from '../lib/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [filter, setFilter] = useState('upcoming');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const data = await Events.list(filter === 'all' ? undefined : filter);
      setEvents(data.events || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter]);

  return (
    <Container>
      <div className="flex items-center justify-between mt-6 mb-4">
        <h1 className="text-2xl font-semibold">Your Events</h1>
        <Link to="/new"><Button>New Event</Button></Link>
      </div>
      <div className="mb-4">
        <FilterTabs active={filter} onChange={setFilter} />
      </div>

      {loading ? (
        <p className="text-sm">Loading...</p>
      ) : events.length === 0 ? (
        <div className="card p-6 text-center">
          <p className="mb-3">No events found.</p>
          <Link to="/new"><Button>Create your first event</Button></Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map(ev => (
            <EventCard
              key={ev._id}
              event={ev}
              onEdit={() => navigate('/edit', { state: { event: ev } })}
              onDelete={async () => { await Events.remove(ev._id); load(); }}
              onShareToggle={async (next) => { await Events.share(ev._id, next); load(); }}
            />
          ))}
        </div>
      )}
    </Container>
  );
}