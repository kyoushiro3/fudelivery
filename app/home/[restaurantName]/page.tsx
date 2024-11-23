import NavRestaurant from "@/components/nav/nav";

export default async function CuisinePage(){
    return(
        <div className="w-auto border border-black">
            <h1 className="text-black text-7xl">Cuisine Page</h1>
            <NavRestaurant/>
        </div>
    )
}