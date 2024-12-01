import {Link, useNavigate} from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';


const NavBar = ({ searchTerm, setSearchTerm, user }) => {
     const navigate = useNavigate();
    
    // if(!user) return null;

    return (
        <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
            <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-inner-input-gray shadow-inner-gray'>
                <IoMdSearch fontSize={21} className='ml-1 '/>
                <input 
                    type='text'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='search'
                    name='search'
                    value={searchTerm}
                    onFocus={() => navigate('/search')}
                    className='p-2 w-full bg-white outline-none shadow-inner-input-gray'
                /> 
            </div>
            <div className='flex flex-shrink gap-3'>
                <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
                    <img src={user?.image} alt='user' className='w-8 h-6 md:w-14 md:h-10 rounded-lg'/>
                </Link>
                
                <Link to='/create-pin' className='hidden md:block'>
                    <IoMdAdd className='bg-gray-800 text-gray-100 rounded-lg w-12 h-12 md:w-10 md:h-10 flex justify-center items-center border border-transparent transition-colors duration-200 cursor-pointer hover:border-[#646cff] focus:outline focus:outline-4 focus:outline-webkit-focus-ring-color'/>
                </Link>
                
            </div>
        </div>
    )
}

export default NavBar