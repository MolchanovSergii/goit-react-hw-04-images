import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '35831610-a11fe96d6a1e2d9c789822419';
const PROPERTIES = 'image_type=photo&orientation=horizontal';

export async function fetchApi(searchQuery, page) {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${KEY}&${PROPERTIES}&per_page=12`
  );
  return response.data;
}
export default fetchApi;
