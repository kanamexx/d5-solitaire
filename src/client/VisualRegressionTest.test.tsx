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
  customDiffConfig: { threshold: 0.3 },
});
expect.extend({ toMatchImageSnapshot });

let browser: Browser;
let page: Page;
jest.setTimeout(30000);

beforeAll(async () => {
  browser = await puppeteer.launch({
    // uncomment to debug
    // headless: false,
    // slowMo: 300,
    args: ["--no-sandbox"],
    defaultViewport: {
      height: 1000,
      width: 800,
    },
  });
  page = await browser.newPage();
  await page.goto("http://localhost:3006");
  await page.waitForSelector("#init-button");
});
afterAll(async () => {
  await browser.close();
});

describe("visualization", () => {
  test("components have appropriate visual", async () => {
    await toMatchFullPageSnapshot(page);

    await page.click("#init-button");
    await page.waitForNetworkIdle();
    // const element = await page.$("#init-button");
    await toMatchFullPageSnapshot(page);

    // FIXME: cause RefenenceError if functionize click process.
    await page.evaluate(() => {
      (document.querySelector("#♠A") as HTMLElement).click();
    });
    await page.evaluate(() => {
      (document.querySelector("#♥2") as HTMLElement).click();
    });
    const commit1 = await page.screenshot({ fullPage: true });
    await toMatchFullPageSnapshot(page);

    await page.evaluate(() => {
      (document.querySelector("#♥2") as HTMLElement).click();
    });
    await page.evaluate(() => {
      (document.querySelector("#♠3") as HTMLElement).click();
    });
    await toMatchFullPageSnapshot(page);

    await page.evaluate(() => {
      (document.querySelector("#♥A") as HTMLElement).click();
    });
    await page.evaluate(() => {
      (document.querySelector("#♣2") as HTMLElement).click();
    });
    await toMatchFullPageSnapshot(page);
  });
});

const toMatchFullPageSnapshot = async (page: Page) => {
  const commit = await page.screenshot({ fullPage: true });
  expect(commit).toMatchImageSnapshot();
};
