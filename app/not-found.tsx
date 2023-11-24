"use client";

import CustomImage from "@/components/customImage";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="lg:px-24 lg:py-12 md:py-8 md:px-44 px-4 py-4 flex items-center justify-center flex-col-reverse lg:flex-row md:gap-14 gap-8">
      <div className="w-full lg:w-1/2 relative p-4 lg:pb-0">
        <h1 className="my-2 text-gray-800 font-bold text-xl lg:text-2xl">
          Page Not Found!!!
        </h1>
        <p className="my-2 text-gray-800 text-muted-foreground">
          Sorry about that! Please visit our hompage to get where you need to
          go.
        </p>
        <Button onClick={() => router.push("/")}>
          Back To Home <Undo2 className=" ml-2 w-4 h-4" />
        </Button>
      </div>
      <div>
        <CustomImage
          src="https://res.cloudinary.com/dr4fo7fxu/image/upload/v1700740606/jjuzgsxnwywlw766zdp1.png"
          alt="not found 404"
        />
      </div>
    </div>
  );
};

export default NotFound;
