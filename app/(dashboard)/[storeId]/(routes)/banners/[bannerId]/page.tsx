"use client";

import { useGetSingleBannerQuery } from "@/redux/features/banner/bannerApi";
import { BannerForm } from "./components/bannerForm";

const BannerPage = ({ params }: { params: { bannerId: string } }) => {
  const { data: banner, isLoading } = useGetSingleBannerQuery(params.bannerId);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BannerForm initialData={banner} />
      </div>
    </div>
  );
};

export default BannerPage;
