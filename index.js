import { config, getJson, getJsonBySearchId } from "serpapi";
import * as dotenv from "dotenv";
import delay from "delay";
import ObjectsToCsv from "objects-to-csv";

dotenv.config();
config.api_key = process.env.SERPAPI_KEY;
config.timeout = 60000;

// the keyword combinations we will check our rankings for
const keywords = [
  "serpapi",
  "serp api",
  "Google Search API",
  "Google Search Results API",
  "Google Organic Results API",
  "google serp api",
  "serps api",
  "Google Search Engine API",
  "Google Local Pack API ",
  "Knowledge Graph API",
  "Google Results API",
  "Search Results API",
  "Google News Results API",
  "Google News API",
  "News Results API",
];

//   the domain to check the rankings of
const domain = "https://serpapi.com";

// get the ranking for a keyword combination

async function keywordSearch(keyword) {
  // The paramaters we will include in the the GET request
  const params = {
    q: keyword,
    location: "Austin, Texas, United States",
    google_domain: "google.com",
    gl: "us",
    hl: "en",
    engine: "google",
    num: 10,
    start: 0,
  };

  // here we call the API and wait for it to return the data
  const data = await getJson("google", params);
  return data;
}
// const results = await keywordSearch("serpapi")
// console.log(results);

async function getRanking(data) {
  let keyword = data.search_parameters.q;
  let rank = 1;
  // loop through the organic results untill we find one that matches the domain we are looking for
  while (
    !data.organic_results[rank - 1]["displayed_link"].includes(domain) &&
    rank < data.organic_results.length
  ) {
    rank++;
  }
  // If the rank is greater than or equal to the number of results, we didn't find the domain with this query
  rank = rank < data.organic_results.length ? rank : "N/A";

  return { keyword, rank };
}

// iterate over the list of keywords and get the ranking for each one.
async function getAllRankings(keywords) {
  const rankings = Promise.all(
    keywords.map(async (keyword) => {
        const result = await keywordSearch(keyword);
        return getRanking(result, keyword);
    }
  ))
  return rankings;
}

// getAllRankings(keywords).then((rankings) => console.log(rankings));

// print the keywords and rankings
async function printKeywordRankings() {
  getAllRankings(keywords).then((rankings) => console.log(rankings));
}

async function rankingsToCsv(keywords) {
  getAllRankings(keywords).then((rankings) =>
    new ObjectsToCsv(rankings).toDisk("./test.csv")
  );
}

// rankingsToCsv(keywords);

async function getSearchId(keyword) {
  const params = {
    q: keyword,
    location: "Austin, Texas, United States",
    google_domain: "google.com",
    gl: "us",
    hl: "en",
    engine: "google",
    num: 10,
    start: 0,
    async: true,
  };

  let data = await getJson("google", params);
  const { id } = data.search_metadata;
  return id;
}

async function getAllSearchIds(keywords) {
  const search_ids = [];
  keywords.forEach(async (keyword) => {
    const id = await getSearchId(keyword, "us");
    search_ids.push(id);
  });
  await delay(1000); // wait for the request to be processed.
  return search_ids;
}

async function retrieveSearch(id){
    const data = await getJsonBySearchId(id);
    return data;
}

async function getAllRankingsBySearchId(ids){
    const rankings = Promise.all(
        ids.map(async (id) => {
            const result = await retrieveSearch(id);
            return getRanking(result);
        }
      ))
      return rankings;
}



async function asyncPrintKeywordRankings(){
    const ids = await getAllSearchIds(keywords);
    getAllRankingsBySearchId(ids).then((rankings) => console.log(rankings)); 
}

async function asyncRankingsToCsv() {
    const ids = await getAllSearchIds(keywords);
    getAllRankingsBySearchId(ids).then((rankings) =>
      new ObjectsToCsv(rankings).toDisk("./test.csv")
    );
  }
// asyncRankingsToCsv();

// printKeywordRankings();
// rankingsToCsv();

asyncPrintKeywordRankings();
asyncRankingsToCsv();
