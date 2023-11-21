"use client";

import { Loader } from "@/components/ui/loader";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <Loader>
      <ScaleLoader color="#36d7b7" />
    </Loader>
  );
};

export default Loading;
