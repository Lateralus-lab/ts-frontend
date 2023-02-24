import { useGetEventsQuery } from "./eventsApiSlice";
import { Link } from "react-router-dom";

import Spinner from "../../components/Spinner";

interface Events {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  mpaa_rating: string;
}

const EventList = (): JSX.Element | null => {
  const {
    data: events,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEventsQuery("events");

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess && events) {
    content = (
      <div className="px-4">
        <h1 className="title">Events</h1>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Event
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center">Start Date</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center">Runtime</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center">Rating</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((e: Events) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={e.id}
                >
                  <th
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    scope="row"
                  >
                    <Link to={`/events/${e.id}`}>{e.title}</Link>
                  </th>
                  <td className="py-4 px-6">{e.release_date}</td>
                  <td className="py-4 px-6">{e.runtime}</td>
                  <td className="py-4 px-6">{e.mpaa_rating}</td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      <Link to={`/events/${e.id}`}>Edit</Link>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default EventList;
