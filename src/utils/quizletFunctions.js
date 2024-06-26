const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs"); // Import the fs module
puppeteer.use(StealthPlugin());

// Launch the browser and create a new page
const launchBrowser = async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--window-size=1920,2700",
      "--lang=en-US,en;q=0.9",
    ],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
  );

  return { browser, page };
};

// Navigate to the URL and wait for the required selector

const navigateToPage = async (page, url) => {
  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 30000,
  });

  await page.waitForSelector("script[id=__NEXT_DATA__]");
};

// Extract the raw data from the page
const extractData = async (page) => {
  let raw = await page.$eval(
    "script[id=__NEXT_DATA__]",
    (el) => el.textContent
  );

  return JSON.parse(raw);
};

const extractCardData = (parsedData) => {
  const { dehydratedReduxStateKey } = parsedData.props.pageProps;

  if (!dehydratedReduxStateKey) {
    throw new Error("dehydratedReduxStateKey is undefined");
  }
 
  const state = JSON.parse(dehydratedReduxStateKey);

  if (
    !state ||
    !state.studyModesCommon ||
    !state.studyModesCommon.studiableData ||
    !state.studyModesCommon.studiableData.studiableItems
  ) {
    throw new Error("studiableItems is undefined");
  }

  const cards = state.studyModesCommon.studiableData.studiableItems;

  // Save raw data to a file
//   saveDataToFile(state, "dehydratedkey.json");

  return cards
    .map((card) => {
      // Assuming sideId 1 is the question and sideId 2 is the answer
      let questionSide = card.cardSides.find((side) => side.sideId === 1);
      let answerSide = card.cardSides.find((side) => side.sideId === 2);

      if (answerSide === undefined) {
        questionSide = card.cardSides.find((side) => side.sideId === 0);
        answerSide = card.cardSides.find((side) => side.sideId === 1);
    }

      if (
        !questionSide ||
        !answerSide ||
        !questionSide.media ||
        !answerSide.media ||
        questionSide.media.length === 0 ||
        answerSide.media.length === 0
      ) {
        return null; // Skip this card if any part of it is undefined or empty
      }

      return {
        question: questionSide.media[0].plainText,
        answer: answerSide.media[0].plainText,
      };
    })
    .filter((card) => card !== null); // Remove any null values from the result
};

// Save the transformed data to a file
const saveDataToFile = (data, filename) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`Data saved to ${filename}`);
};

// Main function to orchestrate the above functions
const getQuizletSet = async (url) => {
  const { browser, page } = await launchBrowser();

  try {
    await navigateToPage(page, url);

    const rawData = await extractData(page);
    console.log("raw data extracted");
    // const transformedData = transformData(rawData);
    const transformedData = extractCardData(rawData);
    console.log("raw data transformed");
    // saveDataToFile(transformedData, "flashcards.json");
    console.log("cards saved to flashcards.json");
    return transformedData;
  } catch (error) {
    console.error("Error processing the data:", error.message);

    return null;
  } finally {
    await browser.close();
  }
};

export default getQuizletSet;
