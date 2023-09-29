import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Search from "../../components/Search/search.component";
import NavBar from "../../components/NavBar/navbarcomponent";
import Feed from "../../components/Feed/feed.component";
import PinDetail from "../../components/PinDetail/pindetail.component";
import CreatePin from "../../components/CreatePin/createpin.component";


const Pins = ({user}) => {
const [searchTerm, setSearchTerm] = useState(''); 
// we are creating search term here cz we need to share it among components
// context can also be used here



    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
            </div>
            <div className="h-full">
                <Routes>
                    <Route path="/" element={<Feed />}/>
                    <Route path="/category/:categoryId" element={<Feed />}/>
                    <Route path="/pin-detail/:pinId" element={<PinDetail user={user} />}/>
                    <Route path="/create-pin" element={<CreatePin user={user}/>}/>
                    <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
                </Routes>
            </div>
        </div>
    )
}
 export default Pins;