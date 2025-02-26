import {instance} from "@/lib/axiosLib";
import {RECIPE} from "@/model/schema";
import {Recipes} from "@/app/components/Recipes";

type SearchParams = { [key: string]: string | undefined }


export default async function Home({searchParams}: { searchParams: SearchParams }) {

    const skip = searchParams.skip? parseInt(searchParams.skip) : 10;

    const response = await instance.get(`/recipes?limit=${10}&skip=${skip}`);

    const recipes = response.data.recipes as RECIPE[];

    return (
        <div
            className='font-[family-name:var(--font-poppins)] pt-20 overflow-x-hidden w-full h-full pb-5 flex justify-center'>
            <Recipes recipes={recipes}/>
        </div>
    );
}
