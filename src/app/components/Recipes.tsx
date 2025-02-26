'use client'

import {RECIPE} from "@/model/schema";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

type Props = {
    recipes: RECIPE[]
}

function RecipeCard(recipe: RECIPE) {

    const router = useRouter();

    return <Card key={recipe.id} className='flex sm:overflow-hidden sm:flex-col max-sm:gap-x-5 min max-sm:odd:flex-row-reverse rounded-3xl group' onClick={() => router.push('/recipes/' + recipe.id)}>
        <CardHeader className='relative w-1/4 h-full sm:w-full sm:h-40 shadow-none justify-center items-center sm:p-0'>
            <div className='absolute sm:relative  sm:size-full w-[150px] h-[150px] rounded-full sm:rounded-none overflow-hidden bg-zinc-200'>
                <Image
                    className='object-fill sm:object-cover max-sm:group-hover:-rotate-12 transition duration-700'
                    src={recipe.image}
                    fill
                    alt={recipe.name}
                />
            </div>
        </CardHeader>
        <CardContent className='space-y-1 pt-3 flex-1'>
            <div className={'flex'}>
                <h3 className='font-bold text-sm truncate'>{recipe.name}</h3>
            </div>
            <div className='text-sm'>
                Duration: {recipe.cookTimeMinutes + recipe.prepTimeMinutes} mins
            </div>
            <div className='text-sm'>
                Ingredients: {recipe.ingredients.length}
            </div>
            <div>
                <span className={cn('w-fit h-fit rounded-2xl px-2 py-1 text-sm',{
                    'bg-teal-300 text-teal-700': recipe.difficulty === 'Easy',
                    'bg-yellow-300 text-yellow-700': recipe.difficulty === 'Medium',
                    'bg-rose-300 text-rose-700': recipe.difficulty === 'Hard'
                })}>
                    {recipe.difficulty}
                </span>
            </div>
        </CardContent>
    </Card>;
}

export const Recipes: React.FC<Props> = ({recipes}: Props) => {
    return (
        <div className={'container 2xl:px-20 lg:px-10 md:px-3 px-5'}>
            <div className=''>
                <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 max-sm:gap-y-10 gap-5'}>
                    {
                        recipes.map((recipe: RECIPE) => RecipeCard(recipe))
                    }
                </div>
            </div>
        </div>
    )
}