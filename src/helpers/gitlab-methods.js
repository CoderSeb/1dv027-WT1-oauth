import axios from 'axios'

export async function getInformation(accessToken) {
  const url = `https://gitlab.lnu.se/api/v4/user?access_token=${accessToken}`
  const response = await axios.get(url)
  console.log(response.data)
  return {
    id: response.data.id,
    name: response.data.name,
    username: response.data.username,
    avatar: response.data.avatar_url
  }
}