import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectCurrentToken } from "../auth/authSlice";

import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { fetchGenres, selectGenres } from "./fetchEventSlice";
import { RootState } from "../../app/store";
import { useAddEventMutation } from "./eventsApiSlice";

import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import TextArea from "../../components/Form/TextArea";
import Checkbox from "../../components/Form/Checkbox";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface Event {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  mpaa_rating: string;
  description: string;
  genres: any[];
  genres_array: any;
}

const initialEvent: Event = {
  id: 0,
  title: "",
  release_date: "",
  runtime: 0,
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
  const eventGenres = useTypedSelector(selectGenres);

  const dispatch = useDispatch<any>();

  const [addEvent, { isLoading }] = useAddEventMutation();

  const mpaaOptions = [
    { id: "G", value: "G" },
    { id: "PG", value: "PG" },
    { id: "PG13", value: "PG13" },
    { id: "R", value: "R" },
    { id: "NC17", value: "NC17" },
    { id: "18A", value: "18A" },
  ];

  const [event, setEvent] = useState<Event>(initialEvent);
  const [errors, setErrors] = useState<string[]>([]);

  const hasError = (key: any) => {
    return errors.indexOf(key) !== -1;
  };

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
        runtime: 0,
        mpaa_rating: "",
        description: "",
        genres: [],
        genres_array: [Array(13).fill(false)],
      });

      dispatch(fetchGenres());
      const checks: Check[] = [];

      eventGenres.genres.forEach((g: any) => {
        checks.push({ id: g.id, checked: false, genre: g.genre });
      });

      setEvent((e) => ({
        ...e,
        genres: checks,
        genres_array: [],
      }));
    } else {
      // editing an existing event
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers,
      };

      fetch(`/admin/events/${eventId}`, requestOptions)
        .then((response) => {
          if (response.status !== 200) {
            console.log("Invalid response code: " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          data.event.release_date = new Date(data.event.release_date)
            .toISOString()
            .split("T")[0];

          const checks: any[] = [];

          data.genres.forEach((g: any) => {
            if (data.event.genres_array.indexOf(g.id) !== -1) {
              checks.push({ id: g.id, checked: true, genre: g.genre });
            } else {
              checks.push({ id: g.id, checked: false, genre: g.genre });
            }
          });

          setEvent({ ...data.event, genres: checks });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [eventId, token, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errors: string[] = [];
    let required = [
      { field: event.title, name: "Title" },
      { field: event.release_date, name: "release_date" },
      { field: event.runtime, name: "runtime" },
      { field: event.description, name: "description" },
      { field: event.mpaa_rating, name: "mpaa_rating" },
    ];

    required.forEach(function (obj) {
      if (obj.field === "") {
        errors.push(obj.name);
      }
    });

    if (event.genres_array.length === 0) {
      alert("Please select at least one genre");
    }

    setErrors(errors);

    if (errors.length > 0) return false;

    let method = "PUT";

    if (event.id > 0) {
      method = "PATCH";
    }

    const requestBody = event;

    requestBody.release_date = new Date(event.release_date).toISOString();
    if (typeof event.runtime === "string") {
      requestBody.runtime = parseInt(event.runtime, 10);
    }

    let requestOptions: any = {
      body: requestBody,
      method: method,
      credentials: "include",
    };

    console.log(requestOptions);

    // for testing purposes
    try {
      await addEvent(requestOptions);
      navigate("/admin/events");
    } catch (err) {
      console.log(err);
    }
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

  const renderButton = isLoading ? (
    <div>Loading</div>
  ) : (
    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      Save
    </button>
  );

  // <pre>{JSON.stringify(event, null, 3)}</pre>

  return (
    <div className="px-4">
      <h2 className="title">Edit Event</h2>
      <hr className="my-3" />
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={event.id} id="id"></input>

        <Input
          className="input"
          title={"Title"}
          type={"text"}
          name={"title"}
          errorDiv={hasError("Title") ? "danger" : "hidden"}
          errorMsg={hasError("Title") ? "Please enter a title" : null}
          value={event.title}
          onChange={handleChange("title")}
        />

        <Input
          className="input"
          title={"Release Date"}
          type={"date"}
          name={"release_date"}
          errorDiv={hasError("release_date") ? "danger" : "hidden"}
          errorMsg={
            hasError("release_date") ? "Please enter a release date" : null
          }
          value={event.release_date}
          onChange={handleChange("release_date")}
        />

        <Input
          className="input"
          title={"Runtime"}
          type={"text"}
          name={"runtime"}
          errorDiv={hasError("runtime") ? "danger" : "hidden"}
          errorMsg={hasError("runtime") ? "Please enter a runtime" : null}
          value={event.runtime}
          onChange={handleChange("release_date")}
        />

        <Select
          title={"MPAA Rating"}
          name={"mpaa_rating"}
          options={mpaaOptions}
          placeHolder={"Select MPAA Rating"}
          errorDiv={hasError("mpaa_rating") ? "danger" : "hidden"}
          errorMsg={hasError("mpaa_rating") ? "Please choose" : null}
          value={event.runtime.toString()}
          onChange={handleChange("mpaa_rating")}
        />

        <TextArea
          title={"Description"}
          name={"description"}
          value={event.description}
          errorDiv={hasError("description") ? "danger" : "hidden"}
          errorMsg={
            hasError("description") ? "Please enter a description" : null
          }
          rows={3}
          onChange={handleChange("description")}
        />

        <hr />

        <h3 className="my-2 text-3xl font-bold dark:text-white">Genres</h3>
        {renderGenres}

        <hr className="my-3" />
        {renderButton}
      </form>
    </div>
  );
};

export default EditEvent;
