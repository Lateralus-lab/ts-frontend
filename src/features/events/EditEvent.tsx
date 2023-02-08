import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import { selectCurrentToken } from "../auth/authSlice";

import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import TextArea from "../../components/Form/TextArea";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const EditEvent = () => {
  const token = useTypedSelector(selectCurrentToken);
  const navigate = useNavigate();

  const mpaaOptions = [
    { id: "G", value: "G" },
    { id: "PG", value: "PG" },
    { id: "PG13", value: "PG13" },
    { id: "R", value: "R" },
    { id: "NC17", value: "NC17" },
    { id: "18A", value: "18A" },
  ];

  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, [token, navigate]);

  const [event, setEvent] = useState({
    id: 0,
    title: "",
    release_date: "",
    runtime: 0,
    mpaa_rating: "",
    description: "",
  });

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
      </form>
    </div>
  );
};

export default EditEvent;
