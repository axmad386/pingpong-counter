import {addIconSelectors} from "@iconify/tailwind"
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/App.tsx", "./src/components/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [
    addIconSelectors(["bx"])
  ],
}

