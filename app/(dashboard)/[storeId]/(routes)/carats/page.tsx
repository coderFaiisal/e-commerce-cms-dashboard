import { CaratsClient } from "./components/client";

const CaratsPage = async () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CaratsClient />
      </div>
    </div>
  );
};

export default CaratsPage;
