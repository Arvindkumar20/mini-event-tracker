import Button from "./Button";
import { fmt } from "../lib/date";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event, onEdit, onDelete, onShareToggle }) {
  const navigate = useNavigate();
  return (
    <div className="card p-4">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-sm mt-1">{fmt(event.dateTime)}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {event.location}
          </p>
          {event.description && (
            <p className="text-sm mt-2">{event.description}</p>
          )}
          {event.isPublic && event.shareId && (
            <a
              className="text-md text-indigo-600 hover:underline inline-block break-all"
              href={`${window.location.origin}/share/${event.shareId}`}
            >
              <Button className="flex text-blue-600 items-center justify-center font-medium bg-white hover:bg-white mt-2 cursor-pointer">
                Share with anyone {() => navigate(`share/${event.shareId}`)}
              </Button>
            </a>
          )}
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <Button onClick={onEdit} className="bg-slate-700 hover:bg-slate-800">
            Edit
          </Button>
          <Button
            onClick={() => onShareToggle(!event.isPublic)}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {event.isPublic ? "Disable Share" : "Enable Share"}
          </Button>
          <Button onClick={onDelete} className="bg-red-600 hover:bg-red-700">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
