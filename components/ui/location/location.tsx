const LoacationAutocomplete = () =>{
    const fetchRestaurants = async(location: string)=>{
        try {
            const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=3a6292136bd74cefa73a0730f01fd59e`) 
        } catch (error) {
            
        }
    }
}