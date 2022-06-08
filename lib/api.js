import { supabase } from './supabase_client';

export const getBookmark = async (userId, bookId) => {
  const { data } = await supabase
    .from('Bookmark')
    .select()
    .eq('userId', userId)
    .eq('bookId', bookId)
    .maybeSingle();

  return data;
};

export const getLibrary = async (userId, bookId) => {
  const { data } = await supabase
    .from('Library')
    .select()
    .eq('userId', userId)
    .eq('bookId', bookId)
    .maybeSingle();

  return data;
};

export const getBookPopularBooks = async () => {
  const { data, error } = await supabase.rpc('popular_books_2');
  const bookIds = data?.map((item) => item?.f_bookId);
  const { data: popularBooks } = await supabase
    .from('Book')
    .select()
    .in('bookId', bookIds);
  return popularBooks;
};

export const getBookNewestBooks = async (bookId) => {
  const { data } = await supabase
    .from('Book')
    .select()
    .order('created_at', { ascending: false })
    .limit(5);

  return data;
};

export const getLibraryBookInfo = async (userId, bookId) => {
  const { data: library } = await supabase
    .from('Library')
    .select('bookId, readingState, rating')
    .eq('userId', userId)
    .eq('bookId', bookId)
    .maybeSingle();
  return library;
};

export const getAllBookmarks = async (userId) => {
  const { data } = await supabase
    .from('Bookmark')
    .select()
    .eq('userId', userId);

  return data;
};
