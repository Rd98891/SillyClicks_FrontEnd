import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from "../../utils/sanity/data";
import { client } from "../../client";
import MasonryLayout from "../Masonry/masonry.component";
import Spinner from "../Spinner/spinner.component";
import GoogleLogoutButton from "../Button/gsoutbutton.component";


const activeBtnStyles = "bg-red-500 text-white p-2 rounded-full w-20 outline-none font-bold"
const notActiveBtnStyles = "bg-primary mr-4 text-black p-2 rounded-full w-20 outline-none font-bold"

const UserProfile = () => {
    const [user, SetUser] = useState(null);
    const [pins, setPins] = useState(null);
    const [text, setText] = useState("Created"); // Created || Saved
    const [activeBtn, setActiveBtn] = useState('Created') 
    const [randomImage, setRandomImage] = useState('');
    const navigate = useNavigate();
    const {userId} = useParams();

    const fetchRandomImage = async () => {
        try {
          const response = await fetch(
            `https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
          );
          const data = await response.json();
          
          setRandomImage(data.urls.full);
        } catch (error) {
          console.error('Error fetching the random image:', error);
        }
      };

    const getGoogleLogoutResponse = async () => {
        try {
            await signOutUser(); // Sign out the user
            localStorage.removeItem(user); // Clear user data from localStorage
            console.log('User logged out');
            
            // Optional: Redirect the user to login or home page after logout
            navigate('/login'); 
        } catch (error) {
            console.error('Error during sign-out:', error);
        }
    }

    useEffect(() => {
        fetchRandomImage();
        const query = userQuery(userId);

        client.fetch(query)
        .then((data) => {
            SetUser(data[0]);
        })
    }, [userId])

    useEffect(() => {
        if(text === 'Created') {
            const createdPinsQuery = userCreatedPinsQuery(userId);

            client.fetch(createdPinsQuery)
            .then((data) => setPins(data))
        } else {
            const savedPinsQuery = userSavedPinsQuery(userId);

            client.fetch(savedPinsQuery)
            .then((data) => setPins(data))
        }

    },[text, userId])
    
    if (!user) {
        return <Spinner message="Loading userProfile..."/>
    }


    return ( 
        <div className="relative pb-2 h-full justify-center items-center">
            <div className=" flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <div className="flex flex-col justify-center items-center">
                        <img 
                            src={randomImage}
                            className="w-full h-370 xl:h-510 shadow-lg object-cover"
                            alt="BannerPic"
                        />
                        <img 
                            src={user.image}
                            className="rounded-full shadow-xl -mt-10 w-20 h-20 object-cover"
                            alt="UserImage"
                        />
                        <h1 className="mt-3 font-bold text-3xl text-center">{user.userName}</h1>
                        <div className="absolute top-0 z-1 right-0 p-2">

                            {
                                userId === user._id && (
                                    <GoogleLogoutButton handleGoogleLogout={getGoogleLogoutResponse}/>
                                )
                            }
                        </div>
                    </div>
                    <div className="text-center mb-7">
                            <button 
                                type="button"
                                onClick={(e) => {
                                    setText(e.target.textContent);
                                    setActiveBtn('created');
                                }}
                                className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles} hover:underline`}
                            >
                            Created
                            </button>
                            <button 
                                type="button"
                                onClick={(e) => {
                                    setText(e.target.textContent);
                                    setActiveBtn('saved');
                                }}
                                className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles} hover:underline`}
                            >
                            Saved
                            </button>
                    </div>
                    {pins?.length ? (
                        <div className="px-2">
                            <MasonryLayout pins={pins}/>
                        </div>
                    ) : (
                        <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                            No Pins Found
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default UserProfile;

// Check @ 4:13