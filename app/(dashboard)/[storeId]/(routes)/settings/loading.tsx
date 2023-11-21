"use client";

import CustomLoader from "@/components/customLoader";
import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <CustomLoader>
      <RingLoader color="#36d7b7" />
    </CustomLoader>
  );
};

export default Loading;
