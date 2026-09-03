"use client";

import { useState, useEffect } from "react";
import AllResources from "@/components/main/AllResources/allResources";
import { Resource } from "../../../../packages/types/resource.type";
import FeaturedResources from "@/components/main/FeaturedResources/featuredResources";
import Stats from "@/components/main/Stats/stats";
import Header from "@/components/main/Header/Header";
import { typeColors, typeLabels } from "@/data/types";
import { ResourcesApi } from "@/utils/resources/resource.api";

export default function DashboardPage() {
  const [resources, setResources] = useState<Resource[] | []>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resources = await ResourcesApi.getAll();
        console.log(resources);
        setResources(resources);
      } catch (error) {
        return;
      }
    };
    fetchData();
  }, []);

  const featuredResources = resources.filter((r) => r);
  const recentResources = [...resources]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <Header
        title="کتابخانه"
        description="مدیریت منابع آموزشی و کتاب‌های برنامه‌نویسی"
        button="منبع جدید"
      />

      <Stats resources={resources} />

      <FeaturedResources
        featuredResources={featuredResources}
        typeColors={typeColors}
        typeLabels={typeLabels}
      />

      <AllResources
        resources={resources}
        loading={loading}
        setLoading={setLoading}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
    </div>
  );
}
