const apiKey = 'EL6SgCuKq4F8uXd4lfVcA';

export const fetchBook = async (search, signal) => {
  let results = [];
  search = search.replace(' ', '+');
  const callAPI = await fetch(
    `https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${search}`,
    { signal: signal }
  );
  const response = await callAPI.text();
  const res = new window.DOMParser().parseFromString(response, 'text/xml');
  const data = res
    .getElementsByTagName('GoodreadsResponse')[0]
    .children[1].getElementsByTagName('best_book');

  for (let i = 0; i < data.length; i++) {
    results.push({
      id: data[i].children[0].textContent,
      title: data[i].children[1].textContent,
      author: data[i].children[2].childNodes[3].textContent,
      smallImage: data[i].children[4].textContent
    });
  }
  return results;
};
