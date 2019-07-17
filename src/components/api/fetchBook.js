const apiKey = 'EL6SgCuKq4F8uXd4lfVcA';

export const fetchBook = async search => {
  search = search.replace(' ', '+');
  const callAPI = await fetch(
    `https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${search}`
  );
  const response = await callAPI.text();
  const res = new window.DOMParser().parseFromString(response, 'text/xml');
  const data = res
    .getElementsByTagName('GoodreadsResponse')[0]
    .children[1].getElementsByTagName('work');
  return data;
};
