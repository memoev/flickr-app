import { describe, it, expect } from "@jest/globals";
import { modelTransformation } from "../../src/utils/helper";

const dataInput = [
  {
    title: ["Untitled"],
    link: [
      {
        $: {
          rel: "enclosure",
          type: "image/jpeg",
          href: "https://live.staticflickr.com/65535/51295549821_6f2e5e4d7f_b.jpg",
        },
      },
    ],
    category: [
      {
        $: {
          term: "test",
          scheme: "https://www.flickr.com/photos/tags/",
        },
      },
    ],
  },
];

describe("modelTransformation function returns desired output", () => {
  it("returns an the right model based on input data", () => {
    const input = [...dataInput];
    const output = [
      {
        title: "Untitled",
        link: "https://live.staticflickr.com/65535/51295549821_6f2e5e4d7f_b.jpg",
        tags: ["test"],
      },
    ];

    expect(modelTransformation(input)).toEqual(output);
  });
  it("returns an empty array if no tags are present", () => {
    const input = [...dataInput];
    input[0].category = [];

    const output = [
      {
        title: "Untitled",
        link: "https://live.staticflickr.com/65535/51295549821_6f2e5e4d7f_b.jpg",
        tags: [] as any,
      },
    ];

    expect(modelTransformation(input)).toEqual(output);
  });
  it("returns the right number of records", () => {
    const input = [...dataInput, ...dataInput];

    expect(modelTransformation(input)).toHaveLength(2);
  });
});
