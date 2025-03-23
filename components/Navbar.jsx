import { Icons } from "./Icons";

const Navbar = () => {
    return (
        <div className="fixed top-0 bg-secondary h-[50px] w-full p-2">
            <div className="flex justify-between">
                <h1 className="font-semibold text-2xl">Writty</h1>
                <Icons.cog/>
            </div>
            
        </div>
    )
}

export default Navbar;