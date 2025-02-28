import {instance} from "@/lib/axiosLib";
import {RECIPE} from "@/model/schema";
import Image from 'next/image'
import {ChefHat, Clock,  Globe, LucideIcon,  Star, Tags, UsersRound} from "lucide-react";
import Link from 'next/link'
import {Separator} from "@/components/ui/separator";

type Props = {
    params: {
        id: number
    }
}

const page = async ({params}: Props) => {

    const id = await params.id;

    const response = await instance.get("/recipes/" + id);

    const recipe = response.data as RECIPE;

    return (
        <div
            className='flex flex-col gap-y-3 justify-center items-center pt-20 lg:px-20 px-3 font-[family-name:var(--font-poppins)]'>

            {/* image */}
            <div
                className='relative flex w-full aspect-[3/4] min-[400px]:aspect-[3/2] md:aspect-[3/1] rounded-lg bg-zinc-200 overflow-hidden'>
                <Image src={recipe.image} alt={recipe.name} className='object-cover w-full' fill/>
            </div>

            {/* icons */}
            <div className='grid md:grid-cols-2 xl:grid-cols-5 w-full h-fit py-5'>
                <Icons title={'Cuisine'} value={recipe.cuisine} Icon={Globe}/>
                <Icons title={'Servings'} value={recipe.servings} Icon={UsersRound}/>
                <Icons title={'Prep Time'} value={recipe.prepTimeMinutes} Icon={Clock}/>
                <Icons title={'Cook Time'} value={recipe.cookTimeMinutes} Icon={ChefHat}/>
                <Icons title={'Difficulty'} value={recipe.difficulty} Icon={Star}/>
            </div>

            <Separator className='bg-zinc-200 border-1'/>

            {/* tags */}
            <div className='w-full flex'>
                <RecipeTags tags={recipe.tags}/>
            </div>

            {/* ingredients */}
            <div className='w-full flex rounded-xl shadow-2xl px-10 py-5'>
                <Ingredients ingredients={recipe.ingredients}/>
            </div>

            {/* instructions */}
            <div className='flex w-full mt-3 sm:mt-5'>
                <Instructions instructions={recipe.instructions} />
            </div>
        </div>
    )
}

export default page;

const Icons = ({title, value, Icon}: {
    title: string,
    value: string | number,
    Icon: LucideIcon
}) => {

    const modifiedValue = typeof value === 'number' && value === 0 ? "-" : value;

    return (
        <div className='grid col-span-1'>
            <div className='flex py-3 gap-x-3'>
                <span
                    className='bg-primary/10 flex justify-center items-center max-sm:w-10 max-sm:h-10 w-14 h-14 rounded-full'>
                    <Icon className='w-5 h-5 text-orange-400'/>
                </span>
                <div className='flex flex-col gap-y-1'>
                    <span className='font-semibold max-sm:text-sm text-lg'>{title}</span>
                    <span className='max-sm:text-xs'>{modifiedValue}</span>
                </div>
            </div>
        </div>
    )
}

const Ingredients = ({ingredients}: { ingredients: string[] }) => {
    return (
        <div className='w-full flex flex-col gap-y-3'>
            <span>
                <h2 className='max-sm:text-lg text-3xl font-bold'>Ingredients</h2>
            </span>
            <ul className='flex flex-col gap-y-2'>
                {
                    ingredients.map((ingredient, i) => (
                        <li key={i} className='max-sm:text-xs text-lg text-zinc-500'>
                            {ingredient}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

const Instructions = ({instructions}: { instructions: string[] }) => {
    return (
        <div className='w-full flex flex-col gap-y-3'>
            <span>
                <h2 className='font-bold text-xl sm:text-3xl lg:text-4xl'>Cooking <span className='text-orange-400'>Instructions</span></h2>
            </span>

            <ul className='flex flex-col gap-y-3'>
                {
                    instructions.map((instruction, i) => {
                        const index = i < 10 ? '0'+i : i
                        return( <li key={i} className='w-full flex max-sm:text-xs text-lg p-5 gap-x-3 bg-zinc-100 text-zinc-500'>
                            <span className='text-sm sm:text-lg lg:text-4xl font-semibold text-orange-400'>{index}</span>
                            <span>{instruction}</span>
                        </li>)
                    })
                }
            </ul>
        </div>
    )
}

const RecipeTags = ({tags}: { tags: string[] }) => {
    return (
        <div className='flex flex-col w-full gap-y-5'>
            <span className={'flex'}>
                <Tags className='max-sm:w-5 max-sm:h-5 w-8 h-8 text-black'/>
                <span className='font-semibold max-sm:text-xs ml-3'>Tags</span>
            </span>
            <ul className='w-full flex flex-wrap gap-x-3'>
                {
                    tags.map((tag, i) => (
                        <Link href={`/recipes/tags/${tag}`} key={i}>
                            <li key={i}
                                className='px-2 py-1 rounded-full bg-zinc-200 text-zinc-500 max-sm:text-xs text-sm'>
                                {tag}
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}