import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';

const GET_PHOTOS = gql`
  query Photos($search: String, $page: Int, $limit: Int) {
    photos(
      options: {
        paginate: { page: $page, limit: $limit }
        search: { q: $search }
      }
    ) {
      data {
        id
        title
        url
        thumbnailUrl
      }
      meta {
        totalCount
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_PHOTOS, {
    variables: {
      search: 'est',
      page: 1,
      limit: 5,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
