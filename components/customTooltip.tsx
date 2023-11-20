"use client";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black dark:bg-white text-white dark:text-black rounded-md shadow-md px-1 text-left">
        <div className="p-2 text-xs">
          <p className="font-medium">{payload[0]?.payload?.name}</p>
          <p>Total: ${payload[0].payload.total}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
