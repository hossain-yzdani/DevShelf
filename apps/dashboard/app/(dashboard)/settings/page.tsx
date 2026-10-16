"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import Header from "@/components/main/Header/Header";
import TabsSetting from "@/components/settings/tabs";

import { useSettings } from "@/hooks/useSettings";


import { GeneralSettings } from "@/components/settings/tabs/generalSettings";
import { AppearanceSettings } from "@/components/settings/tabs/appearanceSettings";
import { ResourceSettings } from "@/components/settings/tabs/resourceSettings";
import { UserSettings } from "@/components/settings/tabs/userSettings";
import { SecuritySettings } from "@/components/settings/tabs/securitySettings";
import { EmailSettings } from "@/components/settings/tabs/emailSettings";
import { AdvancedSettings } from "@/components/settings/tabs/advansedSettings";
import Message from "@/components/ui/toasts/message";
import SettingsSkeleton from "@/components/settings/skeletons/settings";

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

  const {
    settings,
    loading,
    saving,
    message,
    clearMessage,
    hasChanges,
    setValue,
    getValue,
    saveAll,
    cancelChanges,
  } = useSettings();

  if (loading) {
    return <SettingsSkeleton />;
  }

  const tabProps = {
    settings,
    getValue,
    setValue,
  };

  return (
    <div className="space-y-6">
      {message && (
        <Message
          type={message.type}
          message={message.text}
          onClose={clearMessage}
        />
      )}

      <Header
        title="تنظیمات"
        description="مدیریت تنظیمات سایت"
        button="ذخیره تنظیمات"
        saveLogo={true}
      />

      {hasChanges && (
        <div className="glass rounded-xl p-4 border border-purple-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            You have unsaved changes
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={cancelChanges}
              className="px-4 py-2 rounded-xl glass text-gray-300 hover:text-white text-sm transition"
            >
              لغو
            </button>
            <button
              onClick={saveAll}
              disabled={saving}
              className="btn-glow px-4 py-2 rounded-xl text-white text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  در حال ذخیره...
                </>
              ) : (
                <>
                  <Save size={14} />
                  ذخیره تغییرات
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <TabsSetting
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="bg-[#171717] rounded-xl border border-white/5 p-6">
        {activeTab === "general" && <GeneralSettings {...tabProps} />}
        {activeTab === "appearance" && <AppearanceSettings {...tabProps} />}
        {activeTab === "resources" && <ResourceSettings {...tabProps} />}
        {activeTab === "users" && <UserSettings {...tabProps} />}
        {activeTab === "security" && <SecuritySettings {...tabProps} />}
        {activeTab === "email" && <EmailSettings {...tabProps} />}
        {activeTab === "advanced" && <AdvancedSettings {...tabProps} />}
      </div>
    </div>
  );
}
