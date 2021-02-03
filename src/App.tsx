import React, { useCallback, useState } from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import ImageRow from './components/ImageRow';

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PhotosData {
  photos: {
    data: Photo[];
    meta: {
      totalCount: number;
    };
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
  const [page, setPage] = useState<number>(1);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { error, data } = useQuery<PhotosData, PhotosVars>(GET_PHOTOS, {
    variables: {
      q,
      page,
      limit: 5,
    },
  });
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setQ(event.target.value),
    [setQ]
  );
  const handleSelectPhoto = useCallback(
    (photo: Photo) => setSelectedPhoto(photo),
    [setSelectedPhoto]
  );
  const handleModalHide = useCallback(() => setSelectedPhoto(null), [
    setSelectedPhoto,
  ]);

  if (error) return <p>Error</p>;

  console.log(data);

  return (
    <div>
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
                <ImageRow
                  key={photo.id}
                  photo={photo}
                  onSelect={handleSelectPhoto}
                />
              ))}
          </tbody>
        </Table>
        <Row>
          <Col>
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Col>
        </Row>
      </Container>
      <Modal show={selectedPhoto} onHide={handleModalHide}>
        <Modal.Header closeButton />

        <Modal.Body>
          <Image src={selectedPhoto?.url} className="w-100" />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
