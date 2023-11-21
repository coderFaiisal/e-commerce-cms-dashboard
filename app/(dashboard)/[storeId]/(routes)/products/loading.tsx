"use client";

import { Loader } from "@/components/ui/loader";
import { GridLoader } from "react-spinners";

const Loading = () => {
  return (
    <Loader>
      <GridLoader color="#36d7b7" />
    </Loader>
  );
};

export default Loading;
