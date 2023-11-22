"use client";

import { Loader } from "@/components/ui/loader";
import { BarLoader } from "react-spinners";

const Loading = () => {
  return (
    <Loader>
      <BarLoader color="#36d7b7" />
    </Loader>
  );
};

export default Loading;
