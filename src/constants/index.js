import langColors from './colors'

const GITHUB_TOKEN = process.env.GITHUB_PERSONAL_TOKEN;

const FETCH_HEADER = {
  Authorization: `Token ${GITHUB_TOKEN}`,
}

const GITHUB_LINK = "https://github.com/IllusionOfControl/octoprofile";

export {
  GITHUB_TOKEN,
  FETCH_HEADER,
  GITHUB_LINK,
  langColors,
};