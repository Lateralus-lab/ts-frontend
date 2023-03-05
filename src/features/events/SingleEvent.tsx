import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fetchEvent, selectCurrentEvent } from "./fetchEventSlice";

import Spinner from "../../components/Spinner";
import { RootState } from "../../app/store";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface Genres {
  checked: boolean;
  genre: string;
  id: number;
}

const SingleEvent = () => {
  const { id } = useParams();
  const { event, error, isLoading } = useTypedSelector(selectCurrentEvent);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchEvent(id));
  }, [dispatch, id]);

  if (isLoading) return <Spinner />;
  if (error) return <div>{error}</div>;

  if (!event) {
    return (
      <section>
        <h2>Event not found!</h2>
      </section>
    );
  }

  const renderGenres = event?.genres.map((g: Genres) => (
    <span
      className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
      key={g.genre}
    >
      {g.genre}
    </span>
  ));

  const renderImage = event?.image !== "" && (
    <div className="mb-3">
      <img
        src={`https://image.tmdb.org/t/p/w200/${event?.image}`}
        alt="poster"
      />
    </div>
  );

  const content = (
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
        {renderGenres}
        <hr className="mb-2 mt-2" />
        {renderImage}
        <div>{event?.description}</div>
      </div>
    </div>
  );

  return content;
};

export default SingleEvent;
