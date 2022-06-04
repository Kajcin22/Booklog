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

  const [response, setResponse] = useState('');

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

    fetch(`https://www.googleapis.com/books/v1/volumes?${params}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponse(data.items);
      });
  };

  return (
    <>
      <Modal
        opened={opened}
        overflow="inside"
        size="80%"
        onClose={() => setOpened(false)}
        title="Vyhledej knížku"
      >
        <form onSubmit={form.onSubmit(handleSearch)}>
          <TextInput
            label="Název knihy"
            placeholder="zadejte název knihy"
            {...form.getInputProps('title')}
          />
          <TextInput
            label="Autor"
            placeholder="zadejte autora knihy"
            {...form.getInputProps('author')}
          />
          <TextInput
            label="ISBN"
            placeholder="zadejte ISBN knihy"
            {...form.getInputProps('ISBN')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Vyhledej</Button>
          </Group>
        </form>
        <div className={styles.searchResults}>
          {response &&
            response.map((item) => (
              <SearchResult
                imgUrl={item?.volumeInfo?.imageLinks?.thumbnail}
                author={item?.volumeInfo?.authors?.toString()}
                title={item?.volumeInfo?.title}
                description={item?.volumeInfo?.description}
                key={item?.id}
                setOpened={setOpened}
                bookId={item?.id}
              />
            ))}
        </div>
      </Modal>
    </>
  );
};

export default SearchModal;
