'use client'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

type Props = {
    skip: number;
    total: number;
}

const Paginator = ({skip, total}: Props) => {

    const currentPage = (skip + 10) / 10;
    const totalNumberOfPages = total % 10 > 0 ? (total / 10) + (total % 10) : total / 10;

    const hasPrevPage = currentPage > 1;
    const hasNextPage = currentPage < totalNumberOfPages;

    console.log("currentPage", skip, totalNumberOfPages);


    return (
        <Pagination>
            <PaginationContent>

                {
                    hasPrevPage ?
                        <PaginationItem>
                            <PaginationPrevious href={`/recipes?skip=${skip - 10}`}/>
                        </PaginationItem> : null
                }

                {
                    new Array(totalNumberOfPages).fill(0).map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink href={`/recipes?skip=${i * 10}`} isActive={(i + 1) === currentPage}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                }


                {
                    hasNextPage ? <PaginationItem>
                        <PaginationNext href={`/recipes?skip=${skip + 10}`} isActive={skip === totalNumberOfPages}/>
                    </PaginationItem> : null
                }
            </PaginationContent>
        </Pagination>
    )
}

export default Paginator;