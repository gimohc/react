import { useState } from "react";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Profile } from "./Profile.tsx";
import "./App.css";

function App() {
  const [lastIndex, setLastIndex] = useState<number>(0);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [doneEntries, setDoneEntries] = useState<Entry[]>([]);

  interface Entry {
    id: number;
    title: string;
    editing: boolean;
  }
  function handleSaveEditButtonClick(id: number) {
    const newValue = (document.getElementById("text" + id) as HTMLInputElement)
      .value;
    const newEntries = entries.map((entry) => {
      if (entry.id === id) {
        entry.title = newValue;
        entry.editing = false;
      }
      return entry;
    });
    setEntries(newEntries);
  }
  function handleEditButtonClick(id: number) {
    //const entry = entries.find((entry) => entry.id === id);
    const newEntries: Entry[] = entries.map((entry) => {
      if (entry.id === id) entry.editing = !entry.editing;
      return entry;
    });
    setEntries(newEntries);
  }
  function handleAddEntryClick(index: number) {
    const text = (document.getElementById("text") as HTMLInputElement).value;
    (document.getElementById("text") as HTMLInputElement).value = "";

    const newEntries: Entry[] = [...entries];
    newEntries.push({ id: index, title: text, editing: false });
    setEntries(newEntries);
  }
  function handleEntryDoneClick(id: number) {
    const entry = entries.find((entry) => entry.id === id);
    setEntries(entries.filter((toFilter) => toFilter !== entry));
    const newDoneEntries: Entry[] = [...doneEntries];

    if (entry) newDoneEntries.push(entry);
    setDoneEntries(newDoneEntries);
  }
  return (
    <>
      <h1>tasks</h1>
      <input id="text"></input>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleAddEntryClick(lastIndex);
          setLastIndex((number) => number + 1);
        }}
      >
        Add Task
      </button>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.editing ? (
              <>
                <input
                  id={"text" + entry.id}
                  defaultValue={entry.title}
                ></input>
                <button
                  onClick={() => {
                    handleSaveEditButtonClick(entry.id);
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {entry.title}
                <button
                  onClick={() => {
                    handleEditButtonClick(entry.id);
                  }}
                >
                  {" "}
                  edit{" "}
                </button>
              </>
            )}
            <button
              onClick={() => {
                handleEntryDoneClick(entry.id);
              }}
            >
              done
            </button>
          </li>
        ))}
      </ul>
      <ul>
        <h1> done </h1>
        {doneEntries.map((entry) => (
          <li key={entry.id}>{entry.title}</li>
        ))}
      </ul>
    </>
  );
}

//export function Profile() {}

export default App;
