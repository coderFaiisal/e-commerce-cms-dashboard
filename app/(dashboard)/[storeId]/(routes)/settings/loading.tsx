"use client";

import { Loader } from "@/components/ui/loader";
import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <Loader>
      <RingLoader color="#36d7b7" />
    </Loader>
  );
};

export default Loading;
