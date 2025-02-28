'use client'

import {RECIPE} from "@/model/schema";
import Image from "next/image";
import Link from 'next/link'
import {ChefHat} from "lucide-react";

type Props = {
    recipes: RECIPE[]
}

const Card = ({recipe}: { recipe: RECIPE }) => {

    return (

            <div className='grid col-span-1 p-5 rounded-3xl bg-zinc-200'>
                <div className='flex flex-col gap-y-5'>
                    {/* name */}
                    <span>
                        <h2 className='text-lg sm:text-xl lg:text-2xl font-semibold'>
                            {recipe.name}
                        </h2>
                    </span>
                    {/* image */}
                    <div className='relative w-full aspect-[11/12] rounded-3xl overflow-hidden'>
                        <Image src={recipe.image} alt={recipe.name} fill className='object-cover'/></div>
                    {/* button */}
                    <Link href={`/recipes/${recipe.id}`}>
                        <span className="flex w-full group justify-between items-center capitalize rounded-full max-sm:text-xs bg-black text-white py-2 px-3">
                            see complete recipe
                            <span className='w-8 h-8 flex justify-center items-center bg-white group-hover:bg-primary/20 rounded-full'>
                                <ChefHat className='w-5 h-5 text-black group-hover:text-orange-400'/>
                            </span>
                        </span>
                    </Link>
                </div>
            </div>

    )
}

export const Recipes: React.FC<Props> = ({recipes}: Props) => {
    return (
        <div className={'container 2xl:px-20 lg:px-10 md:px-3 px-5'}>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    recipes.map((recipe: RECIPE, index: number) => (
                        <Card recipe={recipe} key={index}/>
                    ))
                }
            </div>
        </div>
    )
}