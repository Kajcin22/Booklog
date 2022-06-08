import { Modal, TextInput, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import SearchResult from '../SearchResult/search-result';
import styles from './SearchModal.module.css';

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

  const createSearchParams = ({ title, author, ISBN }) => {
    let result = '';
    if (title) {
      result = result + `intitle:${title}`;
    }

    if (author) {
      result = result + `+inauthor:${author}`;
    }
    if (ISBN) {
      result = result + `+isbn:${ISBN}`;
    }
    if (result.startsWith('+')) {
      result = result.slice(1);
    }
    console.log(result);
    return result;
  };

  const handleSearch = (formValues) => {
    const params = new URLSearchParams({
      q: createSearchParams(formValues),
      key: process.env.NEXT_PUBLIC_BOOKS_API_KEY || '',
      maxResults: '20',
      langRestrict: 'cs',
    });

    setIsLoading(true);
    fetch(`https://www.googleapis.com/books/v1/volumes?${params}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponse(data, '******');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Modal
        opened={opened}
        overflow="auto"
        size="80%"
        onClose={() => setOpened(false)}
        title="Vyhledej knížku"
      >
        <form onSubmit={form.onSubmit(handleSearch)}>
          <TextInput
            label="Název knihy"
            placeholder="zadejte název knihy"
            rightSection={
              <div onClick={() => form.setFieldValue('title', '')}>X</div>
            }
            {...form.getInputProps('title')}
          />
          <TextInput
            label="Autor"
            placeholder="zadejte autora knihy"
            rightSection={
              <div onClick={() => form.setFieldValue('author', '')}>X</div>
            }
            {...form.getInputProps('author')}
          />
          <TextInput
            label="ISBN"
            placeholder="zadejte ISBN knihy"
            rightSection={
              <div onClick={() => form.setFieldValue('ISBN', '')}>X</div>
            }
            {...form.getInputProps('ISBN')}
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
        </div>
      </Modal>
    </>
  );
};

export default SearchModal;
