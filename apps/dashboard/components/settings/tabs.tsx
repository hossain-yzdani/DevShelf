interface TProps {
  tabs: {
    id: string;
    label: string;
  }[],
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsSetting = ({ tabs, activeTab, setActiveTab }: TProps) => {
  return (
    <div className="flex flex-wrap gap-1 bg-[#171717] rounded-xl border border-white/5 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-lg text-sm transition ${
            activeTab === tab.id
              ? "bg-[#0A0A0A] text-[#F5F5F5]"
              : "text-gray-400 hover:text-[#F5F5F5] hover:bg-white/5"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
 
export default TabsSetting;