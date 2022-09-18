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
    const initialWhole = await page.screenshot({ fullPage: true });
    expect(initialWhole).toMatchImageSnapshot();

    await page.click("#init-button");
    await page.waitForNetworkIdle();
    // const element = await page.$("#init-button");

    const initiated = await page.screenshot({ fullPage: true });
    expect(initiated).toMatchImageSnapshot();

    await commit(page, 0, 0, 6);
    const commit1 = await page.screenshot({ fullPage: true });
    expect(commit1).toMatchImageSnapshot();

    await commit(page, 6, 6, 1);
    const commit2 = await page.screenshot({ fullPage: true });
    expect(commit2).toMatchImageSnapshot();
  });
});

const commit = async (page: Page, from: number, index: number, to: number) => {
  await page.type("#from", from.toString());
  await page.type("#index", index.toString());
  await page.type("#to", to.toString());
  await page.click("#commit-button");
};
