"use client";

import { useState, useEffect } from "react";
import AllResources from "@/components/main/AllResources/allResources";
import { Resource } from "@/types/Resource";
import FeaturedResources from "@/components/main/FeaturedResources/featuredResources";
import Stats from "@/components/main/Stats/stats";
import Header from "@/components/main/Header/Header";
import mockResources from "@/data/mockResources";
import { typeColors, typeLabels } from "@/data/types";


export default function DashboardPage() {
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);

  const featuredResources = resources.filter((r) => r.isFeatured);
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
