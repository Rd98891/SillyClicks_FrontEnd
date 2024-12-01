import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../../client" // This is our sanity client
import MasonryLayout from "../Masonry/masonry.component";
import Spinner from "../Spinner/spinner.component";
import { feedQuery, searchQuery } from "../../utils/sanity/data";

const Feed = () => {

    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        
        setLoading(true);

        if (categoryId) {
            const query = searchQuery(categoryId);
            client.fetch(query)
            .then((data) =>{
                setPins(data);
                setLoading(false);
            })
        } else {
            client.fetch(feedQuery)
            .then((data) => {
                setPins(data);
                setLoading(false);
            })
        }
    }, [categoryId])

    if (loading) return <Spinner message='We are adding new coding ideas to your feed!' />
    

    return ( 
        <div>
            {pins && <MasonryLayout pins={pins}/>} 
        </div>
    )
}

export default Feed