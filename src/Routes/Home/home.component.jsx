import { Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {Link, Route, Routes} from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { client } from "../../client";
import { userQuery } from "../../utils/sanity/data";
import {
    ReactComponent as ScIcon
} from "../../assets/SillyClicksIcon.svg";
import SideBar from "../../components/Sidebar/sidebar.component";
import UserProfile from "../../components/UserProfile/userprofile.component";
import Pins from "../Pins/pins.component";


const Home = () => {
    const [toogleSidebar, setToogleSidebar] = useState(false);
    const [newuser, setNewUser] = useState(null);
    const scrollRef = useRef(null);

    const userInfo = localStorage.getItem('user') !== 'undefined' 
                    ? JSON.parse(localStorage.getItem('user'))
                    : localStorage.clear();

    useEffect(() => {
        const query = userQuery(userInfo?.uid);

        client.fetch(query)
            .then((data) => {
                setNewUser(data[0])
            })
    });

    useEffect(() => {
        scrollRef.current.scrollTo(0,0);
    },[]);

    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial">
                <SideBar user={newuser && newuser}/>
            </div>
            <div className="flex md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToogleSidebar(true)}/>
                    <Link to ='/'>
                        <ScIcon className="w-20"/>
                    </Link>
                    <Link to ={`user-profile/${newuser?._id}`}>
                        <img src={newuser?.image} alt='userImage' className="w-28"/>
                    </Link>
                </div>
                {toogleSidebar && (

                    <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                        <div className="absolute w-full flex justify-end items-center p-2">
                            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToogleSidebar(false)}/>
                        </div>
                        <SideBar user={newuser && newuser} closeToogle={setToogleSidebar}/>
                    </div>
            
                )}

            </div>
    
            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userId" element={<UserProfile/>}/>
                    <Route path="/*" element={<Pins user={newuser && newuser}/>}/>
                </Routes>
            </div>
            <Outlet/>
        </div>
    )
}

export default Home;