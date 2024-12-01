import  { FcGoogle } from 'react-icons/fc';
import { AiOutlineLogout } from "react-icons/ai";

const GoogleLogoutButton = (props) => {
    return <>
        <button
            type='button'
            className='bg-mainColor justify-center items-center flex rounded-lg p-3 cursor-pointer outline-none hover:bg-gray-900 hover:text-gray-100'
            onClick={props.handleGoogleLogout}
        >
        <FcGoogle className='mr-4'/>
            <AiOutlineLogout />
        </button>
    </>
}

export default GoogleLogoutButton;