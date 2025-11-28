"use client";
import { useState, useEffect } from "react";
import { ExternalLink, BookOpen } from "lucide-react";

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
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="max-w-4xl mx-auto px-6 py-14">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-3 text-white tracking-tight">
            Here’s What You Need
          </h1>
          <p className="text-neutral-400 text-lg">
            Quick access to all your resources
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div
                className="relative bg-[#111111] border border-[#1d1d1d] rounded-2xl p-6 transition-all duration-200
                              shadow-[0_0_10px_rgba(0,0,0,0.5)]
                              hover:border-[#2c2c2c] hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]
                              hover:-translate-y-[3px]"
              >
                {/* Thin subtle top highlight */}
                <div
                  className="absolute top-0 left-0 right-0 h-px bg-linear-to-r
                                from-transparent via-white/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity"
                ></div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3
                      className="text-xl font-semibold text-white mb-2
                                   group-hover:text-white/90 transition-colors"
                    >
                      {item.heading}
                    </h3>

                    <p className="text-sm text-neutral-500 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Click to open resource
                    </p>
                  </div>

                  {/* Icon bubble */}
                  <div
                    className="shrink-0 w-12 h-12 bg-[#181818] border border-[#2a2a2a]
                                  group-hover:border-[#3a3a3a]
                                  rounded-xl flex items-center justify-center transition-all
                                  shadow-[0_0_6px_rgba(0,0,0,0.4)]
                                  group-hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                  >
                    <svg
                      className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#111111] rounded-full mb-4 border border-[#1c1c1c]">
              <BookOpen className="w-12 h-12 text-neutral-600" />
            </div>
            <p className="text-neutral-500 text-lg">Loading your links...</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-neutral-600">
          <p className="text-sm">
            {items.length} {items.length === 1 ? "link" : "links"} available
          </p>
        </div>
      </div>
    </div>
  );
}
