import {instance} from "@/lib/axiosLib";
import {RESULT} from "@/model/schema";
import {Recipes} from "@/app/components/Recipes";
import Paginator from "@/app/recipes/components/Paginator";

type SearchParams = { [key: string]: string | undefined }


export default async function Home({searchParams}: { searchParams: SearchParams }) {

    const skip = searchParams.skip ? parseInt(searchParams.skip) : 0;

    const response = await instance.get(`/recipes?limit=${10}&skip=${skip}`);

    const result = response.data as RESULT

    const recipes = result.recipes

    return (
        <div
            className='flex-col font-[family-name:var(--font-poppins)] pt-20 overflow-x-hidden w-full h-full pb-5 flex justify-center'>
            <Recipes recipes={recipes}/>
            <div className='w-full h-fit pb-10 pt-5'>
                <Paginator total={result.total} skip={result.skip}/>
            </div>
        </div>
    );
}
