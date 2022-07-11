import { useContext, useState } from "react";
import UserContext from "../../../context/user/UserContext";
import { FaPencilAlt } from "react-icons/fa";


function UserBio({gamerId, bio}) {
    const [ currentBio, setCurrentBio] = useState(bio);
    const [ changing, setChanging ] = useState(false);
    const { user, changeBio } = useContext(UserContext);

    const uploadBio = async (e) => {
        let newBio = e.target.bioBlock.value;    
        await changeBio(newBio);    
        setCurrentBio(newBio);        
      }
    
      const bioBlockChange = () => {
        setChanging(!changing);      
      }



    return (
        <div id="bio" className="col-span-2 grid grid-cols-1 bg-base-200 rounded-[16px] shadow-inner shadow-black p-2" >
        {" "}
            <h2 className="inline-flex text-accent-focus py-1 text-xl">
            Bio:{" "}
            { (gamerId == user.userID) && (
                <button className="btn-ghost badge badge-outline text-xs mx-4 my-auto p-3 absolute right-12" onClick={bioBlockChange}>
                <FaPencilAlt/>
                </button>
            )}           
            </h2>{" "}
        { !changing && (
                 <h2 className="inline-flex text-neutral-content py-1 text-2xl">
          {currentBio}
        </h2>
        )}
        { changing && (
          <form onSubmit={uploadBio}>
            <textarea  className="inline-flex text-neutral-content py-1 text-2xl text-black" id="bioBlock" defaultValue={currentBio}/>                   
            <button type="submit"
             className='group align-middle float-right relative w-20 justify-center px-10 border border-transparent h-6 min-h-6 text-sm rounded-full btn btn-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus'>
              Submit</button>
          </form>
        )} 
      </div>
    )
}

export default UserBio;
