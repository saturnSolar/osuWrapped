export async function getToken() {
  const url = "/oauth/token";

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  let body = `client_id=${import.meta.env.VITE_OSU_CLIENT_ID}&client_secret=${import.meta.env.VITE_OSU_CLIENT_SECRET}&grant_type=client_credentials&scope=public`;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  let data = await response.json();
  return data.access_token;
}
