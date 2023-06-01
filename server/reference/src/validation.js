const axios = require("axios");
const config = require("config");
const { logger } = require("@coko/server");

axios.interceptors.request.use((req) => {
  logger.debug("Starting Request:", JSON.stringify(req, null, 2));
  return req;
});

axios.interceptors.response.use((resp) => {
  logger.debug("Response:", JSON.stringify(resp.data, null, 2));
  return resp;
});

const pluckAuthors = (authors) => {
  if (!authors) return authors;
  return authors.map(({ given, family, sequence }) => {
    return { given, family, sequence };
  });
};
const pluckTitle = (title) => title && title[0];
const pluckJournalTitle = (journalTitle) => journalTitle && journalTitle[0];
const createReference = (data) => {
  const {
    DOI: doi,
    author,
    page,
    title,
    issue,
    volume,
    "container-title": journalTitle,
  } = data;

  return {
    doi,
    author: pluckAuthors(author),
    page,
    issue,
    volume,
    title: pluckTitle(title),
    journalTitle: pluckJournalTitle(journalTitle),
  };
};
// const refValConfig = config.get('referenceValidator')

const getMatchingReferencesFromCrossRef = async (reference, count = 3) => {
  return await axios
    .get("https://api.crossref.org/works", {
      params: {
        "query.bibliographic": reference,
        rows: count,
        select: "DOI,author,issue,page,title,volume,container-title",
        mailto: "test@gmail.com",
      },
      headers: {
        "User-Agent": "Kotahi (Axios 0.21; mailto:test@gmail.com)",
      },
    })
    .then((response) => {
      return response.data.message.items.reduce(
        (accumulator, current, index) => {
          accumulator.push(createReference(current));
          return accumulator;
        },
        []
      );
    });
};

const getReferenceWithDoi = async (doi) => {
  return await axios
    .get(`https://api.crossref.org/works/${doi}`, {
      params: {
        mailto: "peroli.sivaprakasam@amnet-systems.com",
      },
      headers: {
        "User-Agent":
          "Kotahi (Axios 0.21; mailto:peroli.sivaprakasam@amnet-systems.com)",
      },
    })
    .then((response) => {
      return createReference(response.data.message);
    });
};

module.exports = {
  getMatchingReferencesFromCrossRef,
  getReferenceWithDoi,
};
