declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(): R;
    }
  }
}

import { render } from "@testing-library/react";
import puppeteer, { Browser, Page } from "puppeteer";
import React from "react";
import Card from "../shared/domain/card/Card";
import Rank from "../shared/domain/card/Rank";
import Suit from "../shared/domain/card/Suit";
import CardVeiw from "./CardView";
const { configureToMatchImageSnapshot } = require("jest-image-snapshot");
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: { threshold: 1 },
});
expect.extend({ toMatchImageSnapshot });

let browser: Browser;
let page: Page;

describe("attribute", () => {
  test("contain card class", async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    page = await browser.newPage();
    await page.goto("https://google.com");
    const actual = await page.screenshot();
    await browser.close();
    expect(actual).toMatchImageSnapshot();

    const card = Card.of(Suit.CLUB, Rank.ACE, true);
    const renderResult = render(<CardVeiw card={card} />);
    expect(renderResult.container.getElementsByClassName("card").length).toBe(
      1
    );
  });
});
