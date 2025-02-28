type Props = {
    params: {
        type: string
    }
}

const page = ({params}: Props) => {

    const {type} = params;

    return <div
        className='flex-col font-[family-name:var(--font-poppins)] pt-20 overflow-x-hidden w-full h-full pb-5 flex justify-center'>
        {type}
    </div>

}

export default page;