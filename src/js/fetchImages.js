export const fetchImages = async (inputValue, pageNr) => {

  const BASE_URL = `https://pixabay.com/api/?key=34678398-4542b4caf88c7799836ab624b&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNr}`;
  
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(response.status);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};