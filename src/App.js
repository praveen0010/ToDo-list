import Header from "./Header";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [newtask, setNewtask] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("todo")) || []
  );
  const handelchange = (id) => {
    const newlist = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setItems(newlist);
    localStorage.setItem("todo", JSON.stringify(newlist));
  };
  const handeldelete = (id) => {
    const newlist = items.filter((item) => {
      return item.id !== id;
    });
    setItems(newlist);
    localStorage.setItem("todo", JSON.stringify(newlist));
  };
  const addnewtask = () => {
    const newid = items.length ? items[items.length - 1].id + 1 : 1;
    const newitem = { id: newid, checked: false, content: newtask };
    const newlist = [...items, newitem];
    setItems(newlist);
    localStorage.setItem("todo", JSON.stringify(newlist));
    setNewtask("");
  };
  return (
    <div className="first">
      <main>
        <Header />
        <form
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <input
            autoFocus
            value={newtask}
            onChange={(e) => {
              setNewtask(e.target.value);
            }}
            className="add"
            placeholder="Add Task...."
            type="text"
          />
          <button onClick={addnewtask}>Add</button>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="search"
            type="text"
            placeholder="search here..."
          />
        </form>
        <ul>
          {items
            .filter((item) => {
              return item.content.includes(search);
            })
            .map((item) => {
              return (
                <li key={item.id}>
                  <input
                    onChange={() => handelchange(item.id)}
                    type="checkbox"
                    checked={item.checked}
                  />
                  <label
                    onDoubleClick={() => handelchange(item.id)}
                    style={
                      item.checked ? { textDecoration: "line-through" } : null
                    }
                    className="content"
                  >
                    {item.content}
                  </label>
                  <button
                    className="delbtn"
                    onClick={() => handeldelete(item.id)}
                  >
                    {" "}
                    DEL
                  </button>
                </li>
              );
            })}
        </ul>
      </main>
    </div>
  );
}

export default App;
