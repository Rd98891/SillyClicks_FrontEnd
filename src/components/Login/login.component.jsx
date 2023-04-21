import { useNavigate } from "react-router-dom";

import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import GoogleButton from '../Button/button.component';
import {
    ReactComponent as ScLogo
} from "../../assets/LogoWhite.svg";
import ScVideo from '../../assets/share.mp4';
import { client } from '../../client'; 


const Login = () => {
    
    const navigate = useNavigate();

    const getGoogleResponse = async () => {
        const response = await signInWithGooglePopup();
        localStorage.setItem('user', JSON.stringify(response.user));

        const {
            displayName,
            email,
            uid,
            photoURL
        } = response.user;

        const doc = {
            _id: uid,
            _type: 'user',
            userName: displayName,
            email: email,
            image: photoURL
        }

        client.createIfNotExists(doc).then(
            navigate('/', {replace: true})
        )
        console.log(response);
    }


    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={ScVideo}
                    typeof='video/mp4'
                    muted
                    loop
                    autoPlay
                    controls={false}
                    className='h-full w-full object-cover'
                />
                <div className='absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <ScLogo width='200px' height='200px'/>  
                    </div>
                    <div className='2x1'>
                        <GoogleButton handleGoogleLogin={getGoogleResponse}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;