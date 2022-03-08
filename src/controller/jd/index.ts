import { Request, Response } from "express";
import puppeteer from "puppeteer";
export async function _getHTMLFromJD(req: Request, res: Response) {
  const { keyword } = req.query;
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://search.jd.com/Search" + "?keyword=" + keyword);
    const results = await page.evaluate(() => {
      let res: string[] = [];
      const list = document.querySelector(".gl-warp");
      if (list === null) return [];
      const prices = list.querySelectorAll("strong i");
      prices.forEach((item) => {
        res.push(item.innerHTML);
      });
      return res;
    });
    console.log("results", results);
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    await (browser as puppeteer.Browser).close();
  }
}
