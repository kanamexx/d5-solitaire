declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(): R;
    }
  }
}

import puppeteer, { Browser, Page } from "puppeteer";
const { configureToMatchImageSnapshot } = require("jest-image-snapshot");
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: { threshold: 1 },
});
expect.extend({ toMatchImageSnapshot });

let browser: Browser;
let page: Page;
jest.setTimeout(30000);

beforeAll(async () => {
  browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 300,
    args: ["--no-sandbox"],
  });
  page = await browser.newPage();
  await page.goto("http://localhost:3006");
  await page.waitForSelector("#init-button");
});
afterAll(async () => {
  await browser.close();
});

describe("visualization", () => {
  it("should have appropriate visual", async () => {
    const initialWhole = await page.screenshot();
    expect(initialWhole).toMatchImageSnapshot();

    await page.click("#init-button");
    // const element = await page.$("#init-button");

    const actual = await page.screenshot();
    expect(actual).toMatchImageSnapshot();
  });
});
