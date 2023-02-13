import { Link } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  mpaa_rating: string;
}

const EventExcerpt = (event: any) => {
  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      key={event.id}
    >
      <th
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        scope="row"
      >
        <Link to={`/events/${event.id}`}>{event.title}</Link>
      </th>
      <td className="py-4 px-6">{event.release_date}</td>
      <td className="py-4 px-6">{event.runtime}</td>
      <td className="py-4 px-6">{event.mpaa_rating}</td>
      <td className="py-4 px-6 text-right">
        <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <Link to={`/events/${event.id}`}>Edit</Link>
        </span>
      </td>
    </tr>
  );
};

export default EventExcerpt;
