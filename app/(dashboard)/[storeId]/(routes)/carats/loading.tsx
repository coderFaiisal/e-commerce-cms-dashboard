"use client";

import { Loader } from "@/components/ui/loader";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <Loader>
      <HashLoader color="#36d7b7" />
    </Loader>
  );
};

export default Loading;
