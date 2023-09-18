export const searchGoogleBooks = async (query) => {
  return await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`);
};
