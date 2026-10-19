"use client";

import { TextArea, TextInput } from "@/components/FormField";
import { StatusBadge } from "@/components/StatusBadge";
import { useDemo } from "@/lib/store";
import { useState } from "react";

export default function AdminBannersPage() {
  const { banners, addBanner, updateBanner, deleteBanner } = useDemo();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Banner management</h1>

      <form
        className="panel mt-6 max-w-xl space-y-4 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          addBanner(title, body);
          setTitle("");
          setBody("");
        }}
      >
        <h2 className="font-display text-lg font-bold">Add banner</h2>
        <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <TextArea label="Body" value={body} onChange={(e) => setBody(e.target.value)} required />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {banners.map((b) => (
          <article key={b.id} className="panel p-4">
            {editId === b.id ? (
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  updateBanner(b.id, { title: editTitle, body: editBody });
                  setEditId(null);
                }}
              >
                <TextInput label="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <TextArea label="Body" value={editBody} onChange={(e) => setEditBody(e.target.value)} />
                <div className="flex gap-2">
                  <button type="submit" className="btn btn-primary text-sm">
                    Save
                  </button>
                  <button type="button" className="btn btn-secondary text-sm" onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-bold">{b.title}</h3>
                  <StatusBadge status={b.active ? "active" : "inactive"} />
                </div>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{b.body}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary text-sm"
                    onClick={() => {
                      setEditId(b.id);
                      setEditTitle(b.title);
                      setEditBody(b.body);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-ink text-sm"
                    onClick={() => updateBanner(b.id, { active: !b.active })}
                  >
                    {b.active ? "Deactivate" : "Activate"}
                  </button>
                  <button type="button" className="btn btn-secondary text-sm text-[var(--danger)]" onClick={() => deleteBanner(b.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
