import React, { useCallback, useState } from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PhotosData {
  photos: {
    data: Photo[];
  };
}

interface PhotosVars {
  q: string;
  page: number;
  limit: number;
}

const GET_PHOTOS = gql`
  query Photos($q: String, $page: Int, $limit: Int) {
    photos(
      options: { paginate: { page: $page, limit: $limit }, search: { q: $q } }
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
  const [q, setQ] = useState<string>('');
  const { error, data } = useQuery<PhotosData, PhotosVars>(GET_PHOTOS, {
    variables: {
      q,
      page: 1,
      limit: 5,
    },
  });
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setQ(event.target.value),
    [setQ]
  );

  if (error) return <p>Error</p>;

  console.log(data);

  return (
    <Container className="mt-5">
      <Form as={Row}>
        <Form.Group controlId="search" as={Col}>
          <Form.Control
            type="text"
            placeholder="Search keywords on title"
            value={q}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover as={Row}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.photos &&
            data.photos.data.map((photo) => (
              <tr key={photo.id}>
                <td>{photo.id}</td>
                <td>{photo.title}</td>
                <td>
                  <Image src={photo.thumbnailUrl} rounded />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
