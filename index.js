const axios = require("axios");

let alphabet = "abcdefghijklmnopqrstuvwxyz";
// Use a Set to store unique values
let ans = new Set();
let temp = 0;

// used to get delay of 1 minute
let delay = 60000;
let limit = 100;

async function fetchData(version = 1) {
  // we have different limits of api calling and different query values for different versions
  if (version == 1) {
    limit = 100;
  } else if (version == 2) {
    limit = 50;
    alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  } else {
    limit = 80;
    alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  }

  // in version one we do not need to store single letter query as it is already covered in two letter query
  if (version != 1) {
    for (let i of alphabet) {
      //single letter query
      let query = i;
      try {
        const url = `http://35.200.185.69:8000/v${version}/autocomplete?query=${query}`;
        //getting data
        const { data } = await axios.get(url);

        // storing into the set
        data.results.forEach((item) => ans.add(item));
        temp++;
        console.log(`Fetched: ${query} (Request ${temp})`);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.log(`Rate limit hit! Retrying after ${delay / 1000}s...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          console.error(`Error fetching ${query}:`, error.message);
        }
      }
    }
  }

  for (let i of alphabet) {
    for (let j of alphabet) {
      // two letter query
      let query = i + j;
      try {
        const url = `http://35.200.185.69:8000/v${version}/autocomplete?query=${query}`;
        const { data } = await axios.get(url);
        // storing data into set
        data.results.forEach((item) => ans.add(item));
        temp++;

        console.log(`Fetched: ${query} (Request ${temp})`);

        // checking condition to avoid limit
        if (temp % limit == 0) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      } catch (error) {
        // checking condition for any error
        if (error.response && error.response.status === 429) {
          console.log(`Rate limit hit! Retrying after ${delay / 1000}s...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay=delay*2;
        } else {
          console.error(`Error fetching ${query}:`, error.message);
        }
      }
    }
  }

  console.log(`Total Unique Results from v${version}:`, ans.size);
}

// pass the version number as argument
fetchData(2);
