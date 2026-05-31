import { useState } from 'react'
import './App.css'

export default function App() {
  const [Name, UpdatedName] = useState("");
  const [UserData, SetUserData] = useState(null);
  const [Error, SetError] = useState("");
  useEffect(() => {
    if (Name) {
      fetch(`https://api.github.com/users/${Name}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("User not found");
          }
          return response.json();
        })
        .then(data => {
          SetUserData(data);
          SetError("");
        })
        .catch(error => {
          SetError(error.message);
          SetUserData(null);
        });
    }
  }, [Name]);

  return (
    <>
      <h1>Github Profile Finder</h1>

      <input
        type="text"
        placeholder="Enter Github Username"
        value={Name}
        onChange={(e) => UpdatedName(e.target.value)}
      />

      <button onClick={searchUser}>
        Search
      </button>

      {Error && (
        <p>{Error}</p>
      )}

      {UserData && (
        <pre>
          {JSON.stringify(UserData, null, 2)}
        </pre>
      )}
    </>
  );
}