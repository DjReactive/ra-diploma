export async function Fetching(pathURL,
  callback = () => {}, error = () => {}, options = null) {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${pathURL}`, options);
    if (!response.ok) throw new Error(response.statusText);
    const json = await response.json();
    callback(json);
    return json;
  } catch (err) {
    error(err);
  }
}

export default async function FetchData(pathURL, options = null) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${pathURL}`, options);
    if (!response.ok) throw new Error(response.statusText);
    return response.statusText === "No Content" ? true : await response.json();
}

export async function FetchSearch(search) {
    const params = new URLSearchParams({q: search});
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/items?${params}`);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
}
