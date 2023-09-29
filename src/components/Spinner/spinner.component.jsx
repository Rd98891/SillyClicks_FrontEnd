import {Rings} from "react-loader-spinner";

const Spinner = (props) => {
    return (
        <div className="felx flex-col justify-centre items-center h-full w-full">
            <Rings  
                color="#00BFFF"
                height={50}
                width={200}
                className="m-5"
            />

            <p className="text-lg text-center px-2">{props.message}</p>
                 
        </div>
    )
}

export default Spinner