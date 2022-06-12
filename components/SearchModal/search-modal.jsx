import { Modal, TextInput, Group, Button, Pagination } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import SearchResult from '../SearchResult/search-result';
import styles from './SearchModal.module.css';
import { searchBooks } from '../../lib/api';

const SearchModal = ({ opened, setOpened }) => {
  const form = useForm({
    initialValues: {
      title: '',
      author: '',
      ISBN: '',
    },
  });

  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(0);

  const handleSearch = async (formValues) => {
    setIsLoading(true);
    const result = await searchBooks(formValues, 1);
    setResponse(result);
    setIsLoading(false);
  };

  const onPageChanged = async (value) => {
    setPage(value?.toFixed(0));
    setIsLoading(true);
    const result = await searchBooks(form?.values, value);
    setResponse(result);
    setIsLoading(false);
  };
  console.log(response, 'response');
  return (
    <>
      <Modal
        opened={opened}
        overflow="auto"
        size="80%"
        onClose={() => setOpened(false)}
        title="Vyhledej knížku"
      >
        <form onSubmit={form?.onSubmit(handleSearch)} className="commentForm">
          <TextInput
            label="Název knihy"
            placeholder="zadejte název knihy"
            rightSection={
              <div onClick={() => form?.setFieldValue('title', '')}>X</div>
            }
            {...form?.getInputProps('title')}
          />
          <TextInput
            label="Autor"
            placeholder="zadejte autora knihy"
            rightSection={
              <div onClick={() => form?.setFieldValue('author', '')}>X</div>
            }
            {...form?.getInputProps('author')}
          />
          <TextInput
            label="ISBN"
            placeholder="zadejte ISBN knihy"
            rightSection={
              <div onClick={() => form?.setFieldValue('ISBN', '')}>X</div>
            }
            {...form?.getInputProps('ISBN')}
          />

          <Group position="right" mt="md">
            <Button type="submit" loading={isLoading}>
              Vyhledej
            </Button>
          </Group>
        </form>
        <div className={styles.searchResults}>
          {response &&
            response?.items &&
            response?.items?.map((item) => (
              <SearchResult
                imgUrl={item?.volumeInfo?.imageLinks?.thumbnail}
                author={item?.volumeInfo?.authors?.toString()}
                title={item?.volumeInfo?.title}
                description={item?.volumeInfo?.description}
                key={item?.id}
                setOpened={setOpened}
                bookId={item?.id}
                pageNumber={item?.volumeInfo?.pageCount}
              />
            ))}
          {response?.totalItems === 0 && <p>Nenalezeny žádné výsledky.</p>}
          {response?.totalItems && (
            <Pagination
              styles={{ active: { backgroundColor: '#0795c5' } }}
              initialPage={1}
              page={page}
              onChange={onPageChanged}
              total={(response?.totalItems / 20)?.toFixed(0)}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default SearchModal;
