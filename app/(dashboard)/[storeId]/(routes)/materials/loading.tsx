"use client";

import { Loader } from "@/components/ui/loader";
import { PropagateLoader } from "react-spinners";

const Loading = () => {
  return (
    <Loader>
      <PropagateLoader color="#36d7b7" />
    </Loader>
  );
};

export default Loading;
