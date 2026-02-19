async function fetchData(endpoint, token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`/api/${endpoint}`, {
    method: "GET",
    headers,
  });

  return response.json();
}

export async function getUser(username, token) {
  const response = await fetchData(`users/${username}`, token);
  if (response.status === 404) throw new Error(`User not found`);
  if (!response.status === 200)
    throw new Error(`Failed to fetch data: ${response.status}`);

  return response;
}
