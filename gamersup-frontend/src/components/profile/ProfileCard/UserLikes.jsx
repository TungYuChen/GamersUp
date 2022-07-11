import { useContext, useState } from "react";
import UserContext from "../../../context/user/UserContext";
import { FiThumbsUp } from "react-icons/fi";

function UserLikes({gamerId, likes}) {
    const { user, changeLikes } = useContext(UserContext);
    const [ currentLikes, setCurrentLikes] = useState(likes);
  

    const likesAdd = () => {
        changeLikes( currentLikes + 1);
        setCurrentLikes(currentLikes + 1);
    } 


    return (
        <div className="justify-center flex bg-base-200 rounded-[16px] p-2 grid grid-cols-1 gap-4 shadow-inner shadow-black" >
            <h2 className="inline-flex text-accent-focus py-1 text-xl">
                Likes :
                { gamerId != user.userID && (
                    <button className="btn-ghost badge badge-outline text-xs hover:bg-primary-focus mx-4 my-auto p-3" onClick={likesAdd}>
                        <FiThumbsUp className="inline mr-1 w-5 py-auto mx-2" />
                    </button>
                )}            
            </h2>
            <div>
                <h2 className="inline-flex text-neutral-content py-1 text-3xl">
                    &nbsp;&nbsp;{likes}
                </h2>               
            </div>
      </div>
    )
}

export default UserLikes;
