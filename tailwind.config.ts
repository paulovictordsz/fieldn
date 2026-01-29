import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "bg-app": "var(--bg-app)",
                "bg-sidebar": "var(--bg-sidebar)",
                "bg-content": "var(--bg-content)",
                "bg-hover": "var(--bg-hover)",
                "border-light": "var(--border-light)",
                "border-medium": "var(--border-medium)",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
                "text-tertiary": "var(--text-tertiary)",
                accent: "var(--accent)",
                "accent-hover": "var(--accent-hover)",
                "accent-light": "var(--accent-light)",
            },
        },
    },
    plugins: [],
};
export default config;
