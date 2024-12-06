import { expect, test } from "@jest/globals";
import { Story } from "@/models/story";

test("[Story] Should create a story", () => {
  const story = new Story();

  expect(story.rawContent).toBe("");
});
