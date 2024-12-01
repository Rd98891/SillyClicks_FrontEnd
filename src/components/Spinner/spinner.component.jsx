import HashLoader from "react-spinners/HashLoader";
const Spinner = (props) => {
    return (
        <div className="felx flex-col justify-centre items-center h-full w-full">
            <div className="flex flex-col justify-center items-center">
                <HashLoader 
                    color={'#00BFFF'}
                    size={40}
                    loading={true}
                    className="m-7"
                />
            </div>
            
            <p className="text-lg text-center px-2">{props.message}</p>
                 
        </div>
    )
}

export default Spinner