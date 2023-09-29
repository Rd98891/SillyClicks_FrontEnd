import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

import {
    ReactComponent as ScIcon
} from "../../assets/SillyClicksIcon.svg";

const isNotActiveStyle = "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle = "flex items-center px-5 font-extrabold border-r-2 border-black gap-3 transition-all duration-200 ease-in-out capitalize";

const categories = [
   { name: 'Animals'},
   { name: 'Wallpapers'},
   { name: 'Photography'},
   { name: 'Gaming'},
   { name: 'Coding'},
]

const SideBar = ({user, closeToogle}) => {

    const handleCloseSideBar = () => {
        if (closeToogle)closeToogle(false);
    }
    return (
        <div className="flex flex-col justify-between bg-white h-full min-w-210 overflow-y-scroll hide-scrollbar">
            <div className="flex flex-col">
                <Link to='/' onClick={handleCloseSideBar} className="flex px-5 gap-2 my-6 pt-1 w-190 items-center">
                    <ScIcon className="w-full"/>
                </Link>

                <div className="flex flex-col gap-5">
                    <NavLink 
                        to="/"
                        className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={handleCloseSideBar}
                    >
                        <RiHomeFill/>
                        Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover Categories</h3>
                    {
                        categories.slice(0, categories.length).map((item) => 
                            <NavLink to={`/category/${item.name}`}
                                className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
                                onClick={handleCloseSideBar}
                                key={item.name}
                            >
                            {item.name}
                            </NavLink>
                        )
                    }
                </div>
            </div>
            {
                user && (
                    <Link
                    to={`user-profile/${user._id}`}
                    className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
                    onClick={handleCloseSideBar}
                    >
                        <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile"/>
                        <p>{user.userName}</p>
                    </Link>
                )
            }
        </div>
    )
}

export default SideBar;