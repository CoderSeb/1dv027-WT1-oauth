import axios from 'axios'
import createError from 'http-errors'

/**
 * Helper function to fetch activities from gitlab.
 *
 * @param {string} auth As the access token string.
 * @param {number} userId As the user id.
 */
export const getActivities = async (auth, userId) => {
  try {
    const options = {
      headers: {
        Authorization: auth
      }
    }
    const allEvents = []
    let maxEvents = 101 // The amount of events to get.
    const perPage = 25 // 1 - 100.
    let maxPages = Math.ceil(maxEvents / perPage)
    const lastPageEvents = maxEvents % perPage
    for (let i = 1; i <= maxPages; i++) {
      options.params = {
        per_page: perPage,
        page: i
      }
      const url = `https://gitlab.lnu.se/api/v4/users/${userId}/events`
      const response = await axios.get(url, options)
      if (response.status !== 200) {
        throw createError(400, "Couldn't fetch activities from Gitlab")
      }
      if (response.headers['x-total-pages'] < maxPages) {
        maxPages = Number(response.headers['x-total-pages'])
        maxEvents = Number(response.headers['x-total'])
      }
      i === maxPages
        ? allEvents.push(...response.data.slice(0, lastPageEvents))
        : allEvents.push(...response.data)
    }
    const events = allEvents.map((event) => {
      return {
        id: event.id,
        name: event.action_name,
        created_at: event.created_at,
        target_title: event.target_title || event.push_data?.commit_title,
        target_type: event.target_type || event.push_data?.ref_type
      }
    })
    return events
  } catch (err) {
    if (err.status) {
      throw err
    }
    throw createError(500, 'Issues fetching activities.')
  }
}
