import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  mpaa_rating: string;
  description: string;
  image: string;
  genres: Genres[];
}

interface Genres {
  checked: boolean;
  genre: string;
  id: number;
}

const Event = () => {
  const [event, setEvent] = useState<Event>();
  const { id } = useParams();

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options = {
      method: "GET",
      headers,
    };

    fetch(`${id}`, options)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (event?.genres) {
    event.genres = Object.values(event.genres);
  } else {
    if (event !== undefined) {
      event.genres = [];
    }
  }

  const renderedGenres = event?.genres.map((g: Genres) => (
    <span
      className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
      key={g.genre}
    >
      {g.genre}
    </span>
  ));

  const renderedImage = event?.image !== "" && (
    <div className="mb-3">
      <img
        src={`https://image.tmdb.org/t/p/w200/${event?.image}`}
        alt="poster"
      />
    </div>
  );

  return (
    <div className="px-4">
      <h2 className="title">Event</h2>

      <div className="mb-6">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {event?.title}
        </h5>
        <div className="flex gap-4 text-sm">
          <div>Date: {event?.release_date}</div>
          <div>Runtime: {event?.runtime}</div>
          <div>Rating: {event?.mpaa_rating}</div>
        </div>
        {renderedGenres}
        <hr className="mb-2 mt-2" />
        {renderedImage}
        <div>{event?.description}</div>
      </div>
    </div>
  );
};

export default Event;
