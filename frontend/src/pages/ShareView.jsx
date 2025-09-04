import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import { Events } from '../lib/api';
import { fmt } from '../lib/date';

export default function ShareView() {
  const { shareId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Events.publicGet(shareId).then(r => setEvent(r.event)).catch(() => setError('Event not found'));
  }, [shareId]);

  if (error) return <Container><div className="max-w-2xl mx-auto mt-10 card p-6">{error}</div></Container>;

  if (!event) return <Container><div className="max-w-2xl mx-auto mt-10">Loading...</div></Container>;

  return (
    <Container>
      <div className="max-w-2xl mx-auto mt-10 card p-6">
        <h1 className="text-2xl font-semibold">{event.title}</h1>
        <p className="mt-1">{fmt(event.dateTime)}</p>
        <p className="text-gray-600 dark:text-gray-300">{event.location}</p>
        {event.description && <p className="mt-4">{event.description}</p>}
      </div>
    </Container>
  );
}