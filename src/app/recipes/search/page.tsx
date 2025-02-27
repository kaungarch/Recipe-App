import {Recipes} from "@/app/components/Recipes";
import {instance} from "@/lib/axiosLib";
import {RECIPE} from "@/model/schema";

type Props = {
    searchParams: Promise<{ [key: string]: string | null | number | undefined }>
}

const searchRecipe = async (input: string) => {
    const response = await instance.get(`/recipes/search?q=${input}`);
    const recipes = response.data.recipes as RECIPE[];
    return recipes
}

function ErrorBanner() {
    return <div
        className='font-[family-name:var(--font-poppins)] pt-20 overflow-x-hidden w-full h-full pb-5 flex justify-center'>
        <p className='pt-10'>No results found!</p>
    </div>
}

const page = async ({searchParams}: Props) => {

    const {query} = (await searchParams)

    if (!query || query === "") {
        return ErrorBanner();
    }

    const recipes = await searchRecipe(String(query))

    if (!recipes || !recipes.length) {
        return ErrorBanner();
    }

    console.log(recipes)

    return <div
        className='font-[family-name:var(--font-poppins)] pt-20 overflow-x-hidden w-full h-full pb-5 flex justify-center'>
        <Recipes recipes={recipes}/>
    </div>
}

export default page;