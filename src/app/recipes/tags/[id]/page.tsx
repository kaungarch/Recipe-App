import {Recipes} from "@/app/components/Recipes";
import {instance} from "@/lib/axiosLib";
import {RESULT} from "@/model/schema";

const page = async ({params} : {
    params: {
        id: string
    }
}) => {

    const tag = await params.id;

    const response = await instance.get(`recipes/tag/${tag}`);

    const result = response.data as RESULT;

    const recipes = result.recipes

    return (
        <div className='font-[family-name:var(--font-poppins)] overflow-x-hidden w-full h-full pt-20 pb-5 flex flex-col justify-center'>
            <div className='w-full h-fit py-3 2xl:px-20 lg:px-10 md:px-3 px-5'>
                <span>
                    Total: {result.total}
                </span>
            </div>
            <Recipes recipes={recipes} />
        </div>
    )
}

export default page