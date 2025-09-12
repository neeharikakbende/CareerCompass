import { matchOnlyLetterSpaceOrPeriod,
    matchEmail,
    matchPhone,
    matchUrl,
 } from "./extract-profile";
import type { TextItem } from "../types"; 
import { describe } from "node:test";

const makeTextItem = (text:string) =>
({
    text,
} as TextItem);

describe("extract-profile tests - ", () => {
  it("Name", () => {
    expect(
        matchOnlyLetterSpaceOrPeriod(makeTextItem("Leonardo W. DiCaprio"))![0]
    ).toBe("Leonardo W. DiCaprio");
  });  

  it("Email", () => {
    expect(matchEmail(makeTextItem(" CareerCompass.org  "))![0]).toBe(
      "CareerCompass.org"
    );
  });

  it("Phone", () => {
    expect(matchPhone(makeTextItem("  (123)456-7890  "))![0]).toBe(
      "(123)456-7890"
    );
  });

  it("Url", () => {
    expect(matchUrl(makeTextItem("  linkedin.com/in/CareerCompass "))![0]).toBe(
      "linkedin.com/in/CareerCompass"
    );
    expect(matchUrl(makeTextItem("CareerCompass.org"))).toBeFalsy();
  });
});

