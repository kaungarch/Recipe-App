import {instance} from "@/lib/axiosLib";
import {RECIPE} from "@/model/schema";
import {cn} from "@/lib/utils";
import Image from 'next/image'
import {ChefHat, Clock, Flame, UsersRound} from "lucide-react";
import {ReactNode} from "react";
import Link from 'next/link'
import {ScrollArea} from "@/components/ui/scroll-area";

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
            className='flex flex-col gap-y-3 justify-center items-center pt-20 lg:px-10 px-3 font-[family-name:var(--font-poppins)]'>
            {/* header */}
            <div className='flex w-full h-full'>
                <h1 className='font-bold text-lg sm:text-xl xl:text-3xl'>
                    {recipe.name}
                </h1>
            </div>

            {/* body */}
            <div className='flex flex-col w-full h-full gap-x-3 xl:gap-x-10 max-sm:gap-y-3'>
                {/* section one */}
                <div className='flex flex-col sm:flex-row sm:gap-x-5'>
                    {/* image & icons */}
                    <div className='w-fit max-sm:w-full h-full flex flex-col items-center gap-y-3 max-sm:gap-y-5'>
                        {/* image */}
                        <div
                            className='relative max-sm:aspect-square max-sm:rounded-full w-[300px] h-[300px] 2xl:w-[500px] 2xl:h-[450px] rounded-lg overflow-hidden bg-gray-200 max-sm:outline outline-primary outline-offset-4'>
                            <Image src={recipe.image}
                                   alt={recipe.name}
                                   className='object-cover'
                                   fill
                            />
                        </div>
                        {/* icons */}
                        <div className='grid grid-cols-4 w-full h-full gap-1'>
                            <Icon title={'Preparation'} icon={<Clock className='w-5 h-5 text-black'/>}
                                  value={recipe.prepTimeMinutes}/>
                            <Icon title={'Cook'} icon={<Flame className='w-5 h-5 text-black'/>}
                                  value={recipe.cookTimeMinutes}/>
                            <Icon title={"Serves"} icon={<UsersRound className='w-5 h-5 text-black'/>}
                                  value={recipe.servings}/>
                            <Icon title='Difficulty' icon={<ChefHat className='w-5 h-5 text-black'/>}
                                  value={<span className={cn('px-2 py-1 rounded-lg', {
                                      'bg-teal-300 text-teal-600': recipe.difficulty === 'Easy',
                                      'bg-yellow-300 text-yellow-600': recipe.difficulty === 'Medium',
                                      'bg-rose-300 text-rose-600': recipe.difficulty === 'Hard',
                                  })}>
                                                        {recipe.difficulty}
                                                        </span>}/>

                        </div>
                    </div>

                    {/* ingredients & snacks */}
                    <Ingredients ingredients={recipe.ingredients}/>

                </div>

                {/* section two */}
                <div className='flex flex-col mt-5 gap-y-3'>
                    {/* tags */}
                    <div className='flex flex-wrap gap-x-2'>
                        <div>
                            <p>Tags:</p>
                        </div>
                        <div className='flex flex-wrap gap-x-2'><Tags tags={recipe.tags}/></div>
                    </div>

                    {/* instructions */}
                    <ScrollArea
                        className='flex-1 w-full h-5 max-sm:h-[300px] py-3 pl-3 rounded-lg border border-gray-200'>
                        <Timeline instructions={recipe.instructions}/>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}

export default page;

const Timeline = ({instructions}: {
    instructions: string[]
}) => {
    return (<div className='w-full h-fit'>
        {
            instructions.map((instruction, index) => {
                const isLastInstruction = index === instructions.length - 1;
                return (
                    <div key={index} className='flex gap-x-3 group'>
                        <div className='flex flex-col items-center'>
                        <span
                            className='flex w-8 h-8 md:w-14 md:h-14 rounded-full shadow-2xl bg-primary font-bold justify-center items-center group-hover:bg-white group-hover:border border-primary transition duration-700'>
                            {index + 1}
                        </span>
                            {
                                isLastInstruction ? null :
                                    <span className='block w-[1px] h-12 border-l-2 border-dashed border-primary'></span>
                            }
                        </div>
                        <div className='pt-1 md:pt-3 lg:text-lg md:text-sm text-xs'>
                            {instruction}
                        </div>
                    </div>
                )
            })
        }
    </div>)
}

const Icon = ({title, icon, value}: {
    title: string,
    icon: ReactNode
    value: string | number | ReactNode
}) => {
    return (<div
            className='grid w-full justify-center flex-col text-sm max-sm:text-xs rounded-md border-2 gap-y-1 py-3 border-gray-200'>
            <div className='w-full flex justify-center'><span className='flex w-fit'>{icon}</span></div>
            <div className='flex w-full justify-center'><span className='flex w-fit truncate'>{title}</span></div>
            <div className='flex w-full justify-center'><span className='flex w-fit text-md'>{value}</span></div>
        </div>
    )
}

const Tags = ({tags}: { tags: string[] }) => {

    return tags.map((tag, i) => (
        <Link href={`/recipes/tags/${tag}`} key={i} className='mb-2 group'>
            <span
                className='bg-gray-300 text-gray-600 rounded-xl p-1 text-sm group-hover:bg-white group-hover:text-black border group-hover:border-gray-300 transition duration-500'>
                    {tag}
                </span>
        </Link>
    ))
}

const Ingredients = ({ingredients}: { ingredients: string[] }) => {

    return <div className='max-sm:mt-5 ml-5'>
        <ol start={1}>
            {
                ingredients.map((ingredient, i) => (
                    <li type={'1'} key={i}>
                        {ingredient}
                    </li>
                ))
            }
        </ol>
    </div>

}