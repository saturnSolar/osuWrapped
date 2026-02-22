import { addProcessText } from "./loadingIcon.js";
import { getToken } from "./login.js";
import { getUser } from "./fetchData.js";

export async function processInput(data) {
  const text1 = await addProcessText("Fetching token...");
  const token = await getToken();
  const text2 = await addProcessText("Checking user...");
  const user = await getUser(data, token);
  console.log(user);
  const text3 = await addProcessText("Generating...");
  await addProcessText(`Success, hello ${user.username}!`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
}
