import { Page, BrowserContext, Locator } from "playwright";
import { LocatorUtils } from "../utils/LocatorUtils";
import BasePage from "../../core/ui/interfaces/BasePage";

export class PlayBasePage implements BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<this> {
    await this.page.goto(url);
    return this;
  }

  async getText(locator: string): Promise<string | null> {
    const element = await this.locateElement(locator);
    return element ? await element.textContent() : null;
  }

  async click(locator: string | Locator): Promise<this> {
    let element;
    if (typeof locator === "string")
      element = await this.locateElement(locator);
    else element = locator;
    if (element) {
      await element.click();
    } else {
      throw new Error(`Element not found for locator: ${locator}`);
    }
    return this;
  }

  async type(locator: string | Locator, text: string): Promise<this> {
    let element;
    if (typeof locator === "string")
      element = await this.locateElement(locator);
    else element = locator;
    if (element) {
      await element.type(text);
    } else {
      throw new Error(`Element not found for locator: ${locator}`);
    }
    return this;
  }

  async isVisible(locator: string): Promise<boolean> {
    const element = await this.locateElement(locator);
    return !!element && (await element.isVisible());
  }

  async isEnabled(locator: string): Promise<boolean> {
    const element = await this.locateElement(locator);
    return !!element && (await element.isEnabled());
  }

  async getAttribute(
    locator: string,
    attribute: string
  ): Promise<string | null> {
    const element = await this.locateElement(locator);
    return element ? await element.getAttribute(attribute) : null;
  }

  async waitForSelector(
    locator: string,
    timeout: number = 80000
  ): Promise<this> {
    await this.page.waitForSelector(locator, { timeout });
    return this;
  }

  async waitForNavigation(): Promise<this> {
    await this.page.waitForNavigation();
    return this;
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async reload(): Promise<this> {
    await this.page.reload();
    return this;
  }

  async setViewport(width: number, height: number): Promise<this> {
    await this.page.setViewportSize({ width, height });
    return this;
  }

  async clearCookies(context: BrowserContext): Promise<this> {
    await context.clearCookies();
    return this;
  }

  async takeScreenshot(path: string): Promise<this> {
    await this.page.screenshot({ path });
    return this;
  }

  async waitForElementCount(
    locator: string,
    count: number,
    timeout: number = 80000
  ): Promise<boolean> {
    try {
      await this.page.waitForSelector(locator, { timeout });
      const elements = await this.page.$$(locator);
      return elements.length === count;
    } catch {
      return false;
    }
  }

  async locateElement(locator: string): Promise<Locator> {
    if (LocatorUtils.isXPath(locator)) {
      return await this.page.locator("xpath=" + locator);
    } else {
      return await this.page.locator(locator);
    }
  }

  async locateAllElement(locator: string): Promise<Array<Locator>> {
    const located: Locator = await this.locateElement(locator);
    return located?.all() || [];
  }

  async locateAllElementText(locator: string): Promise<Array<string>> {
    const located = await this.locateElement(locator);
    await located.first().waitFor({ state: "attached" });
    return (await located?.allTextContents()) || [];
  }
}
