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

export const getAllBookmarks = async (userId) => {
  const { data } = await supabase
    .from('Bookmark')
    .select()
    .eq('userId', userId);

  return data;
};
