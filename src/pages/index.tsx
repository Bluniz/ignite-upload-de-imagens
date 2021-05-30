/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = ({ pageParam = 6 || null }): any =>
    api
      .get('api/images', {
        params: {
          after: pageParam,
        },
      })
      .then(response => response.data);
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    fetchImages,
    /* async ({ pageParam = null }) => {
      if (pageParam !== null) {
        return await api.get(`/api/images/`, {
          params: {
            after: pageParam,
          },
        });
      }

      return await api.get(`/api/images/`);
    }, */
    {
      getNextPageParam: (lastPage, pages) => lastPage.after,
    }
  );

  const formattedData = useMemo(() => {
    const newData = data?.pages.map(item => item.data);

    return newData?.flat();
  }, [data]);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button mt={40} onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
