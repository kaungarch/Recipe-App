'use client'
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useRouter} from "next/navigation";

const SearchDialog = () => {

    const [query, setQuery] = useState<string>('');
    const router = useRouter();

    const search = () => {
        const isQueryValid = query && query.trim().length > 0;
        if (isQueryValid) {
        router.push("/recipes/search?q=" + query);
        return
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className='lg:hidden'>
                    <Search className='w-5 h-5 text-black'/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Search Recipe</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Recipe Name
                        </Label>
                        <Input id="name" placeholder="Pizza" onChange={(e) => setQuery(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={search} disabled={query.trim().length < 1}>Search</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SearchDialog;