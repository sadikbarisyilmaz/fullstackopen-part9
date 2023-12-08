import { useEffect, useState } from "react";
import axios from "axios";

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}
interface FormData {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [isPosted, setIsPosted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<FormData>({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/diaries")
      .then((res) => setDiaries(res.data as Diary[]));
  }, [isPosted]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/diaries", form)
      .catch((e) => setError(e.response.data));
    setForm({
      date: "",
      weather: form.weather,
      visibility: form.visibility,
      comment: "",
    });
    setError("");
    isPosted ? setIsPosted(false) : setIsPosted(true);
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex-",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>Flight Diaries</h1>
      <h2>Add New Diary</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <br />
      {/* {error !== "" ? <div>{error}</div> : null} */}
      <form onSubmit={handleSubmit}>
        <div>
          <p>Date:</p>
          <input
            type="date"
            // onChange={({ target }) => setForm(target.value)}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
            value={form.date}
            name="date"
          />
        </div>
        <div>
          <p>Visibility:</p>
          great
          <input
            type="radio"
            onChange={(event) =>
              setForm({ ...form, visibility: event.target.value })
            }
            value="great"
            name="visibilty"
          />
          good
          <input
            type="radio"
            onChange={(event) =>
              setForm({ ...form, visibility: event.target.value })
            }
            value="good"
            name="visibilty"
          />
          ok
          <input
            type="radio"
            onChange={(event) =>
              setForm({ ...form, visibility: event.target.value })
            }
            value="ok"
            name="visibilty"
          />
          poor
          <input
            type="radio"
            onChange={(event) =>
              setForm({ ...form, visibility: event.target.value })
            }
            value="poor"
            name="visibilty"
          />
        </div>
        <div>
          <p>Weather:</p>
          sunny
          <input
            type="radio"
            onChange={(event) =>
              setForm({ ...form, weather: event.target.value })
            }
            value="sunny"
            name="weather"
          />
          rainy
          <input
            type="radio"
            onChange={(event) =>
              setForm({ ...form, weather: event.target.value })
            }
            value="rainy"
            name="weather"
          />
          cloudy
          <input
            type="radio"
            onChange={(event) =>
              setForm({ ...form, weather: event.target.value })
            }
            value="cloudy"
            name="weather"
          />
          stormy
          <input
            type="radio"
            onChange={(event) =>
              setForm({ ...form, weather: event.target.value })
            }
            value="stormy"
            name="weather"
          />
          windy
          <input
            type="radio"
            onChange={(event) =>
              setForm({ ...form, weather: event.target.value })
            }
            value="windy"
            name="weather"
          />
        </div>
        <div></div>
        <div>
          <p>Comment:</p>
          <input
            type="text"
            onChange={(event) =>
              setForm({ ...form, comment: event.target.value })
            }
            value={form.comment}
            name="coment"
          />
        </div>
        <input type="submit" value="Submit" />
      </form>

      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {diaries.map((diary) => (
          <div
            style={{
              padding: "6px",
              margin: "6px",
              border: "1px solid black",
            }}
            key={diary.id}
          >
            <h3>{diary.date}</h3>
            <div>
              <strong>ID: </strong>
              {diary.id}
            </div>
            <div>
              <strong>Weather: </strong>
              {diary.weather}
            </div>
            <div>
              <strong>Visibility: </strong>
              {diary.visibility}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
