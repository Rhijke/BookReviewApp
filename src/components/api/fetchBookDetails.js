const apiKey = 'EL6SgCuKq4F8uXd4lfVcA';
export const fetchBookDetails = async search => {
  let result = {};
  const callAPI = await fetch(
    `https://www.goodreads.com/book/show/${search}.xml?key=EL6SgCuKq4F8uXd4lfVcA`
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
  console.log(result);

  return result;
};
