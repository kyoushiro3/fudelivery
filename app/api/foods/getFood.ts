export const getFood = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/foods", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fecth foods.");
    }

    const data = await res.json();
    return { foods: data.foods };
  } catch (error) {
    console.error(error);

    return { foods: [] };
  }
};
