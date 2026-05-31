import { useState,useEffect } from 'react'
import './App.css'

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (name) {
      fetch(`https://api.github.com/users/${name}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("User not found");
          }
          return response.json();
        })
        .then(data => {
          setUserData(data);
          setError("");
        })
        .catch(error => {
          setError(error.message);
          setUserData(null);
        });
    }
  }, [name]);

  return (
    <>
      <h1>Github Profile Finder</h1>
      <button onClick={() => setName(searchTerm)}>Search</button>
      <input
        type="text"
        placeholder="Enter Github Username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && (
        <p>{error}</p>
      )}
      {userData && (
        <div className="profile">
          <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
          <h2>{userData.name || userData.login}</h2>
          <p>{userData.bio}</p>
          <p>Followers: {userData.followers} | Following: {userData.following}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
        </div>
      )}
    </>
  );
}