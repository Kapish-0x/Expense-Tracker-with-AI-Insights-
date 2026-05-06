const StatCard = ({ label, value, color = "white" }) => (
  <div className="h-37.5 bg-[#111111] border border-[#222222] rounded-3xl p-8 flex flex-col justify-between hover:border-[#333333] transition-all group">
    <p className="text-[#444444] text-[10px] tracking-[30.1%] font-bold uppercase">{label}</p>
    <h2 className={`text-3xl font-bold tracking-tighter text-${color}`}>
      {value}
    </h2>
  </div>
);

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* 1. Header Section */}
      <div className="flex justify-between items-end">
        <h1 className="text-5xl font-bold tracking-[-3px] text-white underline decoration-[#FF0000] decoration-2 underline-offset-8">
          OVERVIEW
        </h1>
      </div>

      {/* 2. Stats Grid (The 3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="TOTAL INCOME" value="₹50,000" />
        <StatCard label="TOTAL EXPENSE" value="₹29,000"/>
        <StatCard label="NET SAVINGS" value="₹21,000" />
      </div>

      {/* 3. Placeholder for Chart / AI Section */}
      <div className="w-full h-75 bg-[#080808] border border-[#1A1A1A] rounded-[40px] p-8 flex items-center justify-center">
        <p className="text-[#222222] text-[10px] tracking-[5px] uppercase animate-pulse">
          Waiting for transaction data...
        </p>
      </div>
    </div>
  );
};

export default Dashboard;