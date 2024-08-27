import { describe, it, expect, vi } from "vitest";
import { ensureProtocol, getUrl } from "@/utils/utils"; // Adjust the path as necessary

describe("ensureProtocol", () => {
  it("should add https:// if the URL does not have a protocol", () => {
    const result = ensureProtocol("example.com");
    expect(result).toBe("https://example.com");
  });

  it("should not modify the URL if it already has http://", () => {
    const result = ensureProtocol("http://example.com");
    expect(result).toBe("http://example.com");
  });

  it("should not modify the URL if it already has https://", () => {
    const result = ensureProtocol("https://example.com");
    expect(result).toBe("https://example.com");
  });
});

describe("getUrl", () => {
  afterEach(() => {
    vi.resetModules();
  });

  it("should return NEXT_PUBLIC_SITE_URL if it is defined", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const result = getUrl();
    expect(result).toBe("https://example.com");
  });

  it("should return NEXT_PUBLIC_VERCEL_URL if NEXT_PUBLIC_SITE_URL is not defined", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_VERCEL_URL = "example.vercel.app";
    const result = getUrl();
    expect(result).toBe("https://example.vercel.app");
  });

  it("should return http://localhost:3000 if no environment variables are defined", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_VERCEL_URL;
    const result = getUrl();
    expect(result).toBe("http://localhost:3000");
  });

  it("should remove trailing slash from the URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/";
    const result = getUrl();
    expect(result).toBe("https://example.com");
  });

  it("should ensure the URL starts with https:// if it does not", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "example.com";
    const result = getUrl();
    expect(result).toBe("https://example.com");
  });
});
