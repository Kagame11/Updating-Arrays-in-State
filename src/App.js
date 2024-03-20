import React, { useState } from 'react';
import produce from 'immer'; // Import immer

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  function handleClick() {
    const insertAt = 3;
    const nextArtists = produce(artists, draft => {
      draft.splice(insertAt, 0, { id: nextId++, name: name });
    });
    setArtists(nextArtists);
    setName('');
  }

  function handleClick2() {
    const nextArtists = produce(artists, draft => {
      draft.reverse();
    });
    setArtists(nextArtists);
  }

  function handleIncrementClick(index) {
    const nextArtist = produce(artists, draft => {
      draft[index].name = Number(draft[index].name) + 1;
    });
    setArtists(nextArtist);
  }

  function handleCheckboxChange(index) {
    const updatedArtists = artists.map((a, i) => {
      if (i === index) {
        return { ...a, checked: !a.checked };
      }
      return a;
    });
    setArtists(updatedArtists);
  }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        type="number"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          const newArtist = { id: nextId++, name: Number(name) };
          setArtists(produce(artists, draft => {
            draft.push(newArtist);
          }));
          setName('');
        }}
      >
        Add
      </button>
      <button onClick={handleClick}>Insert</button>
      <button onClick={handleClick2}>Reverse</button>
      <ul>
        {artists.map((artist, index) => (
          <li key={artist.id}>
            
            {artist.name}
            <button
              onClick={() => {
                setArtists(produce(artists, draft => {
                  draft.splice(index, 1);
                }));
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                handleIncrementClick(index);
              }}
            >
              +1
            </button>
            <input
              type="checkbox"
              checked={artist.checked}
              onChange={() => handleCheckboxChange(index)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
