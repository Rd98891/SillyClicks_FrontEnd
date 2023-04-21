import  { FcGoogle } from 'react-icons/fc';

const GoogleButton = (props) => {
    return <>
        <button
            type='button'
            className='bg-mainColor justify-center items-center flex rounded-lg p-3 cursor-pointer outline-none'
            onClick={props.handleGoogleLogin}
        >
        <FcGoogle className='mr-4'/>
            Sign-In with Google
        </button>
    </>
}

export default GoogleButton;