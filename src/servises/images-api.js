import axios from 'axios';
const fetchImages = async (keyWord, page) => {
  const result = await axios(
    `https://pixabay.com/api//?q=${keyWord}&page=${page}&key=31851558-820ac2f97dae79a9951146e00&image_type=photo&orientation=horizontal&per_page=12`
  );
  console.log(result.data);
  const images = result.data.hits.map(
    ({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    })
  );
  const totalImages = result.data.totalHits;
  console.log(images);
  console.log(totalImages);
  return { images, totalImages };
};

export default fetchImages;
