import { getFood } from "@/app/api/foods/getFood";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/customCard/card";

const BentoCard = async () => {
  const { foods } = await getFood();

  return (
    <div>
     
        <Card>
         
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>

    </div>
  );
};

export default BentoCard
