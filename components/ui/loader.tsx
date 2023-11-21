"use client";

export const Loader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center">
      {children}
    </div>
  );
};
