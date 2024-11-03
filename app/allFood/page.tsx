import { getFood } from "../api/foods/getFood";
import { DataTable } from "@/components/ui/foodTable/data-table";
import { columns } from "@/components/ui/foodTable/columns";

const AllFood = async () => {
  const { foods } = await getFood();

  return (
    <div className="mt-20 px-4 sm:px-6 md:px-12 lg:px-20 justify-center">
      tryyyyy
      <div className="">
      <DataTable columns={columns} data={foods} />
    </div>
    </div>
  );
};

export default AllFood;


