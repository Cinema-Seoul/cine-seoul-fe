import { generateAllCases } from "./safelist-generate.dev";

it("allcases", () => {
  const result = generateAllCases`a${["1", "2", "3"]}bc${["1", "2"]}`;

  expect(result).toStrictEqual(["a1bc1", "a1bc2", "a2bc1", "a2bc2", "a3bc1", "a3bc2"]);
});
