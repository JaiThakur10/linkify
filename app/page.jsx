"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vS_xIIbMnSE7i-BZsegu2rl2tOQ_MmJGGPC82794so0UlLHPNBQZMbyFDflQlxqnWT7Thub8iaCHycz/pub?output=csv"
    )
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n").slice(1);

        const parsed = lines
          .map((line) => {
            const firstComma = line.indexOf(",");
            if (firstComma === -1) return null;

            const heading = line.slice(0, firstComma).trim();
            const link = line.slice(firstComma + 1).trim();

            if (!heading || !link) return null;

            return { heading, link };
          })
          .filter(Boolean);

        setItems(parsed);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Links to your Problems
      </h1>

      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-5  border rounded-xl shadow-sm hover:shadow-md transition bg-white"
          >
            <h3 className="text-xl text-black font-semibold mb-2">
              {item.heading}
            </h3>
            <a
              href={item.link}
              target="_blank"
              className="inline-block mt-2 text-blue-600 font-medium hover:underline"
            >
              Open →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
