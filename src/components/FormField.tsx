"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type Common = {
  label: string;
  hint?: string;
};

export function FormField({
  label,
  hint,
  children,
}: Common & { children: ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-[var(--ink-soft)]/70">{hint}</span> : null}
    </label>
  );
}

export function TextInput({
  label,
  hint,
  ...props
}: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FormField label={label} hint={hint}>
      <input className="input" {...props} />
    </FormField>
  );
}

export function TextArea({
  label,
  hint,
  ...props
}: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FormField label={label} hint={hint}>
      <textarea className="input min-h-28 resize-y" {...props} />
    </FormField>
  );
}

export function TextSelect({
  label,
  hint,
  children,
  ...props
}: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FormField label={label} hint={hint}>
      <select className="input" {...props}>
        {children}
      </select>
    </FormField>
  );
}
