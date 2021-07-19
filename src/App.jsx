import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import { Note } from "./components/Note";
import style from "./components/Styles.module.css";

export default function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:3001/Notes")
      .then((res) => {
        console.log("resdata", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, [data]);
  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setDesc(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = { title: title, desc: desc, create: Date().toLocaleString() };
    console.log(obj);
    axios.post("http://localhost:3001/Notes", obj);
    getData();
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/Notes/${id}`);
    getData();
  };
  const handleEdit = (id) => {
    axios.delete(`http://localhost:3001/Notes/${id}`, {
      title: title,
      desc: desc,
    });
    getData();
  };
  const handleSort = () => {
    //console.log("sort");
    setData(
      data.sort((a, b) => {
        console.log(a.getTime(), b.getTime());
        return a.create - b.create;
      })
    );
    console.log("data_sort", data);
  };
  const Wrapper = styled.div`
    background-color: #333;
    h1 {
      color: #fff;
    }
  `;

  return (
    <div className="App">
      <Wrapper>
        <h1>Note App</h1>
      </Wrapper>
      <div className={style.Wrapper}>
        <form className={style.form1} onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Enter title"
          />
          <textarea
            name="desc"
            id=""
            cols="30"
            rows="10"
            value={desc}
            onChange={handleChange}
            placeholder="Enter Desccription"
          ></textarea>
          <button type="submit">Save</button>
        </form>
      </div>

      <div>
        <button
          style={{
            color: "#333",
            backgroundColor: "tomato",
            padding: "10px",
            border: "1px solid tomato",
            borderRadius: "7px",
          }}
          onClick={handleSort}
        >
          Sort
        </button>
        <Note prop={data} handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>
    </div>
  );
}
