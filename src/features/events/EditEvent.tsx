import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import { selectCurrentToken } from "../auth/authSlice";

import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import TextArea from "../../components/Form/TextArea";
import Checkbox from "../../components/Form/Checkbox";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface Event {
  id: number;
  title: string;
  release_date: string;
  runtime: string;
  mpaa_rating: string;
  description: string;
  genres: any[];
  genres_array: any;
}

const initialEvent: Event = {
  id: 0,
  title: "",
  release_date: "",
  runtime: "",
  mpaa_rating: "",
  description: "",
  genres: [],
  genres_array: [Array(13).fill(false)],
};

interface Check {
  id: number;
  checked: boolean;
  genre: string;
}

const EditEvent = () => {
  const navigate = useNavigate();
  const token = useTypedSelector(selectCurrentToken);

  const mpaaOptions = [
    { id: "G", value: "G" },
    { id: "PG", value: "PG" },
    { id: "PG13", value: "PG13" },
    { id: "R", value: "R" },
    { id: "NC17", value: "NC17" },
    { id: "18A", value: "18A" },
  ];

  const [event, setEvent] = useState<Event>(initialEvent);

  let { id } = useParams<{ id: string }>();

  let eventId: number;
  if (id !== undefined) {
    eventId = parseInt(id);
  } else {
    eventId = 0;
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (eventId === 0) {
      setEvent({
        id: 0,
        title: "",
        release_date: "",
        runtime: "",
        mpaa_rating: "",
        description: "",
        genres: [],
        genres_array: [Array(13).fill(false)],
      });

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      fetch(`/genres`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          const checks: Check[] = [];

          data.forEach((g: any) => {
            checks.push({ id: g.id, checked: false, genre: g.genre });
          });

          setEvent((e) => ({
            ...e,
            genres: checks,
            genres_array: [],
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // editing an existing event
    }
  }, [eventId, token, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange =
    (prop: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      let value = e.target.value;
      let name = e.target.name;
      setEvent({ ...event, [name]: value });
    };

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    position: number
  ) => {
    let tmpArr = event.genres;
    tmpArr[position].checked = !tmpArr[position].checked;

    let tmpIDs = event.genres_array;
    if (!e.target.checked) {
      tmpIDs.splice(tmpIDs.indexOf(e.target.value));
    } else {
      tmpIDs.push(parseInt(e.target.value));
    }

    setEvent({
      ...event,
      genres_array: tmpIDs,
    });
  };

  const renderGenres = event.genres && event.genres.length > 1 && (
    <>
      {Array.from(event.genres).map((g, index) => (
        <Checkbox
          title={g.genre}
          key={index}
          name={"genre"}
          id={"genre-" + index}
          value={g.id}
          checked={event.genres[index].checked}
          onChange={(e) => handleCheck(e, index)}
        />
      ))}
    </>
  );

  return (
    <div className="px-4">
      <h2 className="title">Edit Event</h2>
      <pre>{JSON.stringify(event, null, 3)}</pre>
      <hr className="my-3" />

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={event.id} id="id"></input>

        <Input
          className="input"
          title={"Title"}
          type={"text"}
          name={"title"}
          value={event.title}
          onChange={handleChange("title")}
        />

        <Input
          className="input"
          title={"Release Date"}
          type={"date"}
          name={"release_date"}
          value={event.release_date}
          onChange={handleChange("release_date")}
        />

        <Input
          className="input"
          title={"Runtime"}
          type={"text"}
          name={"runtime"}
          value={event.runtime.toString()}
          onChange={handleChange("release_date")}
        />

        <Select
          title={"MPAA Rating"}
          name={"mpaa_rating"}
          options={mpaaOptions}
          placeHolder={"Select MPAA Rating"}
          value={event.runtime.toString()}
          onChange={handleChange("mpaa_rating")}
        />

        <TextArea
          title={"Description"}
          name={"description"}
          value={event.description}
          rows={3}
          onChange={handleChange("description")}
        />

        <hr />

        <h3>Genres</h3>
        {renderGenres}
      </form>
    </div>
  );
};

export default EditEvent;
