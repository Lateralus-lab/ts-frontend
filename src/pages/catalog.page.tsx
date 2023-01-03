import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

type Events = {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  mpaa_rating: string;
  description: string;
};

const CataloguePage = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const { accessToken } = useOutletContext<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken === "") {
      navigate("/");
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + accessToken);

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`/admin/catalogue`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [accessToken, navigate]);

  return (
    <div className="px-4">
      <h1 className="title">Catalogue</h1>

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
            {events.map((e) => (
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
};

export default CataloguePage;
