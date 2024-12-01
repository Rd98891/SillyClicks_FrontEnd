import { useState, useEffect } from "react"
import MasonryLayout from "../Masonry/masonry.component"
import { client } from "../../client"
import { feedQuery, searchQuery } from "../../utils/sanity/data"
import Spinner from "../Spinner/spinner.component"


const Search = ({ searchTerm }) => {

    const [pins, setPins] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(searchTerm){
            setLoading(true)
            const query = searchQuery(searchTerm.toLowerCase())

            client.fetch(query)
            .then((data) => {
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
    },[searchTerm])

    return ( 
        <div>
            {loading && <Spinner message="Searching for Pins" />} 
            {pins?.length !== 0 && <MasonryLayout pins={pins} />}
            {pins?.length === 0 && searchTerm !== '' && !loading && (
                <div className="mt-10 text-center text-xl">
                    No Pins Found!
                </div>
            )}
        </div>
    )
}

export default Search