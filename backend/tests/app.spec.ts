import { describe, it, expect, afterAll } from "@jest/globals";
import request from "supertest";
import server from "../src/app";
afterAll((done) => {
  server.close(done);
});

describe("Server runs...", () => {
  it("responds with 200", async () => {
    const response = await request(server).get("/api/public-feed");
    expect(response.status).toBe(200);
  });
});

describe("/public-feed endpoint returns the right structure", () => {
  it("responds with JSON", async () => {
    const response = await request(server).get("/api/public-feed");
    expect(response.type).toBe("application/json");
  });
  it("responds with an array of objects", async () => {
    const response = await request(server).get("/api/public-feed");
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
  });
  it("responds with objects that have the right properties", async () => {
    const response = await request(server).get("/api/public-feed");
    expect(response.body[0]).toHaveProperty("title");
    expect(response.body[0]).toHaveProperty("link");
    expect(response.body[0]).toHaveProperty("tags");
  });
  it("responds with objects that have the right property types", async () => {
    const response = await request(server).get("/api/public-feed");
    expect(typeof response.body[0].title).toBe("string");
    expect(typeof response.body[0].link).toBe("string");
    expect(response.body[0].tags).toBeInstanceOf(
      Array<String> || Array<undefined>
    );
  });
  it("responds with objects that have the right category structure", async () => {
    const response = await request(server).get("/api/public-feed");
    !!response.body[0].tags[0]
      ? expect(typeof response.body[0].tags[0]).toBe("string")
      : expect(response.body[0].tags[0]).toBeUndefined();
  });
});
