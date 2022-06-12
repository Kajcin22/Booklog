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
  const { data: popularBooks, status } = await supabase
    .from('Book')
    .select()
    .in('bookId', bookIds);
  return { popularBooks, status };
};

export const getBookNewestBooks = async (bookId) => {
  const { data, status } = await supabase
    .from('Book')
    .select()
    .order('created_at', { ascending: false })
    .limit(5);

  return { data, status };
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

export const getFinishedPages = async (userId) => {
  const { data: bookIds } = await supabase
    .from('Library')
    .select('bookId')
    .eq('userId', userId)
    .eq('readingState', 'C');
  const ids = bookIds.map((item) => item.bookId);
  const { data } = await supabase
    .from('Book')
    .select('pageNumber')
    .in('bookId', ids);

  return data?.reduce((acc, curr) => {
    if (curr?.pageNumber) {
      return acc + curr.pageNumber;
    }
    return acc;
  }, 0);
};

export const getFinishedBooks = async (userId) => {
  const { count } = await supabase
    .from('Library')
    .select('bookId', { count: 'exact' })
    .eq('userId', userId)
    .eq('readingState', 'C');

  return count;
};

export const getBooksInProgress = async (userId) => {
  const { data: bookIds } = await supabase
    .from('Library')
    .select('bookId', { count: 'exact' })
    .eq('userId', userId)
    .eq('readingState', 'B');

  const ids = bookIds.map((item) => item.bookId);
  const { data: books } = await supabase
    .from('Book')
    .select('pageNumber, bookId, title, id')
    .in('bookId', ids);

  const { data: bookmarks } = await supabase
    .from('Bookmark')
    .select('pageNum, bookId')
    .eq('userId', userId)
    .in(
      'bookId',
      books.map((item) => item.id),
    );

  return books
    .map((item) => {
      const bookmark = bookmarks.find((it) => parseInt(it.bookId) === item.id);
      return {
        ...item,
        bookmark,
      };
    })
    .filter((item) => item?.bookmark?.pageNum && item?.pageNumber);
};

export const getRecommendation = async (userId) => {
  const { data: bookIds } = await supabase
    .from('Library')
    .select('bookId')
    .eq('userId', userId);

  const ids = bookIds.map((item) => item.bookId);

  const { data: userIds } = await supabase
    .from('Library')
    .select('userId')
    .neq('userId', userId)
    .in('bookId', ids);

  const idsUser = userIds.map((item) => item.userId);

  const { data: userBooks } = await supabase
    .from('Library')
    .select('bookId')
    .in('userId', idsUser);

  const { data: recommendation } = await supabase
    .from('Book')
    .select()
    .in(
      'bookId',
      userBooks.map((item) => item.bookId),
    )
    .limit(5);
  return recommendation.filter((item) => !ids.includes(item.bookId));
};
