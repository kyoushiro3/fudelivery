import { foodData } from "@/types/props";
import { getFood } from "../api/foods/getFood";

const AllFood = async () => {
  const { foods } = await getFood();

  return (
    <div>
      tryyyyy
      <ul className="border border-black">
        {foods.map((item: foodData, index: React.Key) => (
          <li key={index} className="text-black text-sm">
            {item.name}
            {item.category}
            {item.img}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllFood;

//allfood or Read from CRUD is now okay
//task this week Add Food and View Food UI
//task: header UI and footer UI
//

//pending task for next week: Update Food and Delete Food
//u do push this message "added: view food API and page"
