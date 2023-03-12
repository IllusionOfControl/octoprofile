import langColors from './colors'

const GITHUB_TOKEN = process.env.GITHUB_PERSONAL_TOKEN;

const FETCH_HEADER = {
  Authorization: `Token ${GITHUB_TOKEN}`,
}

export {
  GITHUB_TOKEN,
  FETCH_HEADER,
  langColors,
};