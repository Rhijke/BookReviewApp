import { goodreadsConfig } from './config';
export const fetchBookDetails = async search => {
  let result = {};
  const callAPI = await fetch(
    `https://www.goodreads.com/book/show/${search}.xml?key=${
      goodreadsConfig.apiKey
    }`
  );
  const response = await callAPI.text();
  const res = new window.DOMParser().parseFromString(response, 'text/xml');
  const data = res.getElementsByTagName('GoodreadsResponse')[0].children[1]
    .children;
  result['id'] = data[0].textContent;
  result['title'] = data[1].textContent;
  result['smallImage'] = data[9].textContent;
  result['image'] = data[8].textContent;
  result['publicationYear'] = data[10].textContent;
  result['rating'] = data[18].textContent;
  result['author'] = data[26].children[0].children[1].textContent;
  result['description'] = data[16].textContent;

  return result;
};

export const fetchBookDescription = async search => {
  const callAPI = await fetch(
    `https://www.goodreads.com/book/show/${search}.xml?key=${
      goodreadsConfig.apiKey
    }`
  );
  const response = await callAPI.text();
  const res = new window.DOMParser().parseFromString(response, 'text/xml');
  const data = res.getElementsByTagName('GoodreadsResponse')[0].children[1]
    .children;

  let details = {
    description: data[16].textContent,
    isbn: data[3].textContent
  };
  return details;
};
