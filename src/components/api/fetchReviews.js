const apiKey = 'EL6SgCuKq4F8uXd4lfVcA';
export const fetchReviews = async search => {
  let results = {};
  const callAPI = await fetch(
    `https://www.goodreads.com/book/show/${search}.xml?key=EL6SgCuKq4F8uXd4lfVcA`
  );
  const response = await callAPI.text();
  const res = new window.DOMParser().parseFromString(response, 'text/xml');
  const data = res.getElementsByTagName('GoodreadsResponse')[0].children[1]
    .children;
  console.log(data);
  results['summary'] = data[16].textContent;
  return results;
};
