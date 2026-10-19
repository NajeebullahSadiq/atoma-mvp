"use client";

import { TextInput } from "@/components/FormField";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import { useState } from "react";

export default function ProfilePage() {
  const { language, profile, updateProfile } = useDemo();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [address, setAddress] = useState(profile.address);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">{t(language, "profile")}</h1>
      <form
        className="panel mt-6 max-w-lg space-y-4 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          updateProfile({ name, email, address });
        }}
      >
        <TextInput label={t(language, "name")} value={name} onChange={(e) => setName(e.target.value)} required />
        <TextInput label={t(language, "mobile")} value={profile.mobile} disabled />
        <TextInput label={t(language, "email")} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextInput label={t(language, "address")} value={address} onChange={(e) => setAddress(e.target.value)} />
        <button type="submit" className="btn btn-primary">
          {t(language, "save")}
        </button>
      </form>
    </div>
  );
}
