"use client";

import { TextArea, TextInput } from "@/components/FormField";
import { useDemo } from "@/lib/store";
import { useState } from "react";

export default function AdminContentPage() {
  const { contentPages, updateContentPage } = useDemo();
  const [activeId, setActiveId] = useState(contentPages[0]?.id ?? "");
  const page = contentPages.find((p) => p.id === activeId) ?? contentPages[0];
  const [title, setTitle] = useState(page?.title ?? "");
  const [body, setBody] = useState(page?.body ?? "");

  function select(id: string) {
    const p = contentPages.find((x) => x.id === id);
    if (!p) return;
    setActiveId(id);
    setTitle(p.title);
    setBody(p.body);
  }

  if (!page) return <p>No content pages.</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Content / CMS</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="space-y-2">
          {contentPages.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => select(p.id)}
              className={`block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold ${
                p.id === page.id ? "bg-[var(--ink)] text-[var(--sand)]" : "bg-[var(--stone)]"
              }`}
            >
              {p.title}
              <span className="mt-0.5 block text-xs opacity-70">/{p.slug}</span>
            </button>
          ))}
        </div>
        <form
          className="panel space-y-4 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            updateContentPage(page.id, { title, body });
          }}
        >
          <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <TextArea label="Body" value={body} onChange={(e) => setBody(e.target.value)} required />
          <button type="submit" className="btn btn-primary">
            Save page
          </button>
        </form>
      </div>
    </div>
  );
}
