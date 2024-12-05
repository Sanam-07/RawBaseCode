export class LocatorUtils {
  static isXPath(locator: string): boolean {
    return (
      locator.startsWith("//") ||
      locator.startsWith("./") ||
      locator.startsWith("(")
    );
  }
}
