import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Event = () => {
  const [event, setEvent] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    let myEvent = {
      id: 1,
      title: "Rave Hub",
      release_date: "2021-09-01",
      runtime: 120,
      mpaa_rating: "R",
      description: "The best rave in the town",
    };

    setEvent(myEvent);
  }, [id]);

  return (
    <div className="px-4">
      <h2 className="title">Event</h2>

      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {event.title}
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          <div>Release Date: {event.release_date}</div>
          <div>Runtime: {event.runtime}</div>
          <div>MPAA Rating: {event.mpaa_rating}</div>
          <div>Desctiption: {event.description}</div>
        </div>
      </div>
    </div>
  );
};

export default Event;
