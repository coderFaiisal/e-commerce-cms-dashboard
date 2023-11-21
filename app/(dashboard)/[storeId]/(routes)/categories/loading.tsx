"use client";

import { Loader } from "@/components/ui/loader";
import { ClockLoader } from "react-spinners";

const Loading = () => {
  return (
    <Loader>
      <ClockLoader color="#36d7b7" />
    </Loader>
  );
};

export default Loading;
