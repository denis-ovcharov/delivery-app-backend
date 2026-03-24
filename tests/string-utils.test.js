const test = require("node:test");
const assert = require("node:assert/strict");
const { normalizeEmail, escapeRegExp } = require("../dist/utils/string");

test("normalizeEmail trims and lowercases", () => {
  assert.equal(normalizeEmail("  USER@Example.COM "), "user@example.com");
});

test("escapeRegExp escapes regex control characters", () => {
  assert.equal(escapeRegExp("a+b*c?."), "a\\+b\\*c\\?\\.");
});
