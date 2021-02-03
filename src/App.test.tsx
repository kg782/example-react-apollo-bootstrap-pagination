import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App, { GET_PHOTOS_QUERY } from './App';
import { MockedProvider } from '@apollo/client/testing';

const mocks = [
  {
    request: {
      query: GET_PHOTOS_QUERY,
      variables: {
        q: '',
        page: 1,
        limit: 5,
      },
    },
    result: {
      data: {
        photos: {
          data: [
            {
              id: '1',
              title: 'photo title 1',
              url: 'https://via.placeholder.com/600/92c952',
              thumbnailUrl: 'https://via.placeholder.com/150/92c952',
            },
            {
              id: '2',
              title: 'photo title 2',
              url: 'https://via.placeholder.com/600/771796',
              thumbnailUrl: 'https://via.placeholder.com/150/771796',
            },
            {
              id: '3',
              title: 'photo title 3',
              url: 'https://via.placeholder.com/600/24f355',
              thumbnailUrl: 'https://via.placeholder.com/150/24f355',
            },
            {
              id: '4',
              title: 'photo title 4',
              url: 'https://via.placeholder.com/600/d32776',
              thumbnailUrl: 'https://via.placeholder.com/150/d32776',
            },
            {
              id: '5',
              title: 'photo title 5',
              url: 'https://via.placeholder.com/600/f66b97',
              thumbnailUrl: 'https://via.placeholder.com/150/f66b97',
            },
          ],
          meta: {
            totalCount: 5000,
          },
        },
      },
    },
  },
];

test('renders list', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const items = await screen.findAllByText(/^photo title/);
  expect(items).toHaveLength(5);
});
