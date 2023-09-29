import { urlFor, client } from "../../client";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { MdDownloadForOffline,  } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { fetchUser } from "../../utils/fetchUser";


const Pin = ({ pin: { postedBy, _id, image, save } }) => {
    
    const [postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false); 

    const navigate = useNavigate();

    const user = fetchUser();

    const alreadySaved = !!(save?.filter(item => item.postedBy1?._id === user.googleId))?.length;

    const savePin = (id) => {
        if (!alreadySaved) {
            setSavingPost(true);

            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: user.googleId,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user.googleId
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload();
                    setSavingPost(false);
                })
        }
    }

    return (
        <div className="m-2">
            <div
                onMouseEnter = {() => setPostHovered(true)}
                onMouseLeave = {() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
            >

                <img className="rounded-lg w-full" alt='user post' src={urlFor(image).width(250).url()} />
                
                {postHovered && (
                    <div className="absolute top-0 h-full w-full flex flex-col justify-between p-1 pr-2 pb-2 pt-2 z-50" style={{ height: '100%' }}>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white flex items-center opacity-75 text-dark text-xl justify-center w-9 h-9 rounded-full hover:opacity-100 hover:shadow-md outline-none"
                                >
                                    <MdDownloadForOffline/>
 
                                </a>
                            </div>

                            {alreadySaved ? (
                                <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                                    { save?.length }  Saved
                                </button>
                            ):(
                                <button
                                
                                    type="button"
                                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                >
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                )}
                
            </div>
        </div>
)} 

export default Pin;

