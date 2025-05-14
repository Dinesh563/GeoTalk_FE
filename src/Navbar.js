const navs = [
    {
        name: "Home",
        href: "#home"
    },
    {
        name: "About",
        href: "#about"
    },
    {
        name: "Experience",
        href: "#experience"
    },
    {
        name: "Skills",
        href: "#skills"
    }
];


function Navbar() {
    return <div className="shadow-sm z-10 sticky top-4 mx-5 h-12 flex flex-nowrap justify-around gap-2 overflow-hidden rounded-xl bg-white p-4 text-sm font-normal opacity-90 md:mx-auto md:w-1/2  shrink-0 items-center animate-fadeout">

        {
            navs.map((ele, key) => { return <a href={ele.href} key={key} className="cursor-pointer hover:text-purple-600 px-3 py-2 rounded-xl transistion duration-300 ease-in-out hover:bg-gray-100"> {ele.name} </a> })
        }
    </div>
}
export default Navbar