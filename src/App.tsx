import React, { useCallback, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import range from 'lodash/fp/range';
import ImageRow from './components/ImageRow';
import { LIST_LIMIT } from './configs';
import PaginationItem from './components/PaginationItem';
import useDebounce from './hooks/useDebounce';

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface PhotosData {
  photos: {
    data: Photo[];
    meta: {
      totalCount: number;
    };
  };
}

export interface PhotosVars {
  q: string;
  page: number;
  limit: number;
}

export const GET_PHOTOS_QUERY = gql`
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
  const debouncedQ: string = useDebounce<string>(q, 500);
  const { loading, error, data } = useQuery<PhotosData, PhotosVars>(
    GET_PHOTOS_QUERY,
    {
      variables: {
        q: debouncedQ,
        page,
        limit: LIST_LIMIT,
      },
    }
  );
  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQ(event.target.value);
      setPage(1);
    },
    [setQ, setPage]
  );
  const handleSelectPhoto = useCallback(
    (photo: Photo) => setSelectedPhoto(photo),
    [setSelectedPhoto]
  );
  const handleModalHide = useCallback(() => setSelectedPhoto(null), [
    setSelectedPhoto,
  ]);
  const handleFirstClick = useCallback(() => setPage(1), [setPage]);
  const lastPage: number = data?.photos?.meta?.totalCount
    ? Math.ceil(data?.photos?.meta?.totalCount / LIST_LIMIT)
    : 0;
  const handleLastClick = useCallback(() => setPage(lastPage), [
    setPage,
    lastPage,
  ]);
  const handlePrevClick = useCallback(() => setPage(page - 1), [setPage, page]);
  const handleNextClick = useCallback(() => setPage(page + 1), [setPage, page]);

  if (error) return <p>Error</p>;

  return (
    <div>
      <Container className="mt-5">
        <Form as={Row}>
          <Form.Group controlId="search" as={Col}>
            <Form.Control
              type="text"
              placeholder="Search keywords on title"
              value={q}
              onChange={handleQueryChange}
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
            {data?.photos?.data &&
              data.photos.data.map((photo) => (
                <ImageRow
                  key={photo.id}
                  photo={photo}
                  onSelect={handleSelectPhoto}
                />
              ))}
          </tbody>
        </Table>
        {loading && (
          <Row>
            <Col>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        )}
        <Row>
          <Col className="clearfix">
            {data?.photos?.meta?.totalCount ? (
              <Pagination className="float-right">
                <Pagination.First
                  onClick={handleFirstClick}
                  disabled={page === 1}
                />
                <Pagination.Prev
                  onClick={handlePrevClick}
                  disabled={page === 1}
                />
                {range(
                  Math.max(1, page - 2),
                  Math.min(lastPage + 1, page + 3)
                ).map((p) => (
                  <PaginationItem
                    key={p}
                    page={p}
                    active={p === page}
                    onSelect={setPage}
                  />
                ))}
                <Pagination.Next
                  onClick={handleNextClick}
                  disabled={page === lastPage}
                />
                <Pagination.Last
                  onClick={handleLastClick}
                  disabled={page === lastPage}
                />
              </Pagination>
            ) : null}
          </Col>
        </Row>
      </Container>
      <Modal show={!!selectedPhoto} onHide={handleModalHide} animation={false}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Image src={selectedPhoto?.url} className="w-100" />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
