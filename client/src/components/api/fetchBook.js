import { goodreadsConfig } from './config';
export const fetchBook = async search => {
  let results = [];
  search = search.replace(' ', '+');
  const callAPI = await fetch(
    `http://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${
      goodreadsConfig.apiKey
    }&q=${search}`
  );
  const response = await callAPI.text();
  const res = new window.DOMParser().parseFromString(response, 'text/xml');
  const work = res.getElementsByTagName('work');

  for (let i = 0; i < work.length; i++) {
    let data = work[i].children[8];
    results.push({
      id: data.children[0].textContent,
      title: data.children[1].textContent,
      author: data.children[2].childNodes[3].textContent,
      image: data.children[3].textContent,
      smallImage: data.children[4].textContent,
      publicationYear: work[i].children[4].textContent,
      rating: work[i].children[7].textContent
    });
  }

  return results;
};
