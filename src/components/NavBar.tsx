'use client'
import {Input} from "@/components/ui/input";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Search} from "lucide-react";
import {useDebouncedCallback} from "use-debounce";

export const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleSearch = useDebouncedCallback(term => {
        router.push("/recipes/search?query=" + term);
    }, 500)

    console.log("search params", pathname)

    return (

        <nav
            className={'fixed flex w-full 2xl:px-20 lg:px-36 md:px-20 px-5 shadow-lg justify-between py-3 font-[family-name:var(--font-poppins)] z-10 bg-white/70 backdrop-blur-lg'}>

            <Link href='/recipes'>
                <div className='flex items-center'>
                    <div className='w-10 sm:w-20'>
                        <AspectRatio ratio={5 / 3} className='bg-gray-200'>
                            <Image src={'/favicon.ico'} alt={'logo'} fill/>
                        </AspectRatio>
                    </div>
                </div>
            </Link>

            <div className={'relative flex items-center gap-x-3'}>
                <Search className='w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-1 top-2.5 sm:top-3.5'/>
                    <Input
                        className='bg-white border border-zinc-300 placeholder:text-gray-400 rounded-lg w-52 sm:w-72 pl-7 text-xs sm:text-sm'
                        placeholder='Search more recipes'
                        onChange={e => handleSearch(e.target.value)}
                        defaultValue={searchParams.get("query") as string}
                    />
            </div>

        </nav>

    )
}