import { render } from "@testing-library/react";
import puppeteer, { Browser, Page } from "puppeteer";
import React from "react";
import Card from "../shared/domain/card/Card";
import Rank from "../shared/domain/card/Rank";
import Suit from "../shared/domain/card/Suit";
import CardVeiw from "./CardView";

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  page = await browser.newPage();
  await page.goto("https://google.com");
  await page.screenshot({ path: "./test.jpeg" });
  await browser.close();
});

describe("attribute", () => {
  test("contain card class", () => {
    const card = Card.of(Suit.CLUB, Rank.ACE, true);
    const renderResult = render(<CardVeiw card={card} />);
    expect(renderResult.container.getElementsByClassName("card").length).toBe(
      1
    );
  });
});
