import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
    return (
        <nav className={'fixed flex backdrop-blur-3xl bg-white/50 z-10 container mb-3 2xl:px-20 lg:px-10 md:px-5 px-5 py-3 font-[family-name:var(--font-poppins)] justify-between shadow-lg'}>

            <Link href='/recipes'>
                <div className='flex items-center'>
                    <div className='w-20'>
                        <AspectRatio ratio={5 / 3} className='bg-gray-200'>
                            <Image src={'/logo.png'} alt={'logo'} fill/>
                        </AspectRatio>
                    </div>
                </div>
            </Link>

            <div className={'2xl:w-1/4 lg:w-1/3 w-full flex gap-x-3 items-center'}>
                <Input className='bg-white border-2'/>
                <Button className={'font-[family-name:var(--font-poppins)]'}>
                    Search
                </Button>
            </div>
        </nav>
    )
}