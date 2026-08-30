"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { GeneralSettings } from "@/components/settings/tabs/generalSettings";
import Header from "@/components/main/Header/Header";
import TabsSetting from "@/components/settings/tabs";
import { AppearanceSettings } from "@/components/settings/tabs/appearanceSettings";
import { ResourceSettings } from "@/components/settings/tabs/resourceSettings";
import { UserSettings } from "@/components/settings/tabs/userSettings";
import { SecuritySettings } from "@/components/settings/tabs/securitySettings";
import { EmailSettings } from "@/components/settings/tabs/emailSettings";
import { AdvancedSettings } from "@/components/settings/tabs/advansedSettings";

const tabs = [
  { id: "general", label: "عمومی" },
  { id: "appearance", label: "ظاهر" },
  { id: "resources", label: "منابع" },
  { id: "users", label: "کاربران" },
  { id: "security", label: "امنیت" },
  { id: "email", label: "ایمیل" },
  { id: "advanced", label: "پیشرفته" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("✅ تنظیمات ذخیره شد!");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Header
        title="ذخیره تنظیمات"
        description="مدیریت تنظیمات سایت"
        button="ذخیره تنظیمات"
        saveLogo={true}
      />

      <TabsSetting
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="bg-[#171717] rounded-xl border border-white/5 p-6">
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "appearance" && <AppearanceSettings />}
        {activeTab === "resources" && <ResourceSettings />}
        {activeTab === "users" && <UserSettings />}
        {activeTab === "security" && <SecuritySettings />}
        {activeTab === "email" && <EmailSettings />}
        {activeTab === "advanced" && <AdvancedSettings />}
      </div>
    </div>
  );
}
