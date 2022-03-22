import axios from 'axios'

export async function getInformation(accessToken) {
  const url = `https://gitlab.lnu.se/api/v4/user?access_token=${accessToken}`
  const response = await axios.get(url)
  return {
    id: response.data.id,
    name: response.data.name,
    username: response.data.username,
    avatar: response.data.avatar_url,
    lao: response.data.last_activity_on,
    email: response.data.email
  }
}