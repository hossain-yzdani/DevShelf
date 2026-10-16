"use client";

import { useState, useEffect, useCallback } from "react";
import { SettingsApi } from "@/utils/settings/settings.api";

interface MessageState {
  type: "success" | "error";
  text: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Map<string, any>>(
    new Map(),
  );
  const [message, setMessage] = useState<MessageState | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
  };

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await SettingsApi.get();
      setSettings(data);
      setPendingChanges(new Map());
    } catch (error: any) {
      showMessage(
        "error",
        error?.response?.data?.message || "Failed to load settings",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const setValue = useCallback((key: string, value: any) => {
    setPendingChanges((prev) => {
      const next = new Map(prev);
      next.set(key, value);
      return next;
    });
  }, []);

  const saveAll = useCallback(async () => {
    if (pendingChanges.size === 0) {
      showMessage("success", "No changes to save");
      return;
    }

    try {
      setSaving(true);

      const settingsArray = Array.from(pendingChanges.entries()).map(
        ([key, value]) => ({ key, value }),
      );

      await SettingsApi.updateMany(settingsArray);
      showMessage("success", "Settings saved successfully");
      await fetchSettings();
    } catch (error: any) {
      showMessage(
        "error",
        error?.response?.data?.message || "Failed to save settings",
      );
    } finally {
      setSaving(false);
    }
  }, [pendingChanges, fetchSettings]);

  const cancelChanges = useCallback(() => {
    setPendingChanges(new Map());
    showMessage("success", "Changes discarded");
  }, []);

  const getValue = useCallback(
    (key: string, dbValue: any) => {
      return pendingChanges.has(key) ? pendingChanges.get(key) : dbValue;
    },
    [pendingChanges],
  );

  return {
    settings,
    loading,
    saving,
    message,
    clearMessage: () => setMessage(null),
    pendingChanges,
    hasChanges: pendingChanges.size > 0,
    setValue,
    getValue,
    saveAll,
    cancelChanges,
    refetch: fetchSettings,
  };
}
