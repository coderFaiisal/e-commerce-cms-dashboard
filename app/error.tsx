"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
    router.refresh();
  };
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">
          404 error!!!
        </h1>
        <p className="mb-4 text-lg">Oops! Looks like you are lost.</p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600">
          <Button onClick={handleBackToHome}>Back to Home</Button>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
