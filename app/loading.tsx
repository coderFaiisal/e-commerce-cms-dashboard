"use client";

import { Loader } from "@/components/ui/loader";
import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <Loader>
      <PuffLoader color="#36d7b7" />
    </Loader>
  );
};

export default Loading;
