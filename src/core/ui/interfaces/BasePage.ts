import { BrowserContext, Page } from "playwright";

export default interface IBasePage {
  page: Page;

  goto(url: string): Promise<this>;

  getText(locator: string): Promise<string | null>;

  click(locator: string): Promise<this>;

  type(locator: string, text: string): Promise<this>;

  isVisible(locator: string): Promise<boolean>;

  isEnabled(locator: string): Promise<boolean>;

  getAttribute(locator: string, attribute: string): Promise<string | null>;

  waitForSelector(locator: string, timeout?: number): Promise<this>;

  waitForNavigation(): Promise<this>;

  getTitle(): Promise<string>;

  reload(): Promise<this>;

  setViewport(width: number, height: number): Promise<this>;

  clearCookies(context: BrowserContext): Promise<this>;

  takeScreenshot(path: string): Promise<this>;

  waitForElementCount(locator: string, count: number, timeout?: number): Promise<boolean>;

}
