import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Import boundaries (see ARCHITECTURE.md). Rule options don't merge across
// config objects, so each override repeats the shared patterns.
const noParentRelative = {
  group: ["../*"],
  message: "Use the @/ alias instead of parent-relative imports.",
};
const noFeatures = {
  group: ["@/features/*"],
  message: "Shared code must not depend on features.",
};
const noComponents = {
  group: ["@/components/*"],
  message: "lib/ must not depend on components.",
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [noParentRelative] }],
    },
  },
  {
    files: ["src/components/**", "src/config/**", "src/types/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [noParentRelative, noFeatures] },
      ],
    },
  },
  {
    files: ["src/lib/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [noParentRelative, noFeatures, noComponents] },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
