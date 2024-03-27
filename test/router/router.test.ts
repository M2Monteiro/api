import app from "@src/app";
import request from "supertest";

describe("Testing application routes", () => {
  it("should get status route", async () => {
    const res = await request(app).get("/api/status");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status");
  });
});
