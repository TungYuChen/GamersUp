import { useContext, useState } from "react";
import UserContext from "../../../context/user/UserContext";
import { FaPencilAlt } from "react-icons/fa";
import LevelSelect from "./LevelSelect";


function UserLevel({gamerId, level}) {
  const { user, changeLevel } = useContext(UserContext);
  const [ currentLevel, setCurrentLevel] = useState(level);  
  const [ changing, setChanging ] = useState(false);
  const [ tempLevel, setTempLevel ] = useState(currentLevel);
  
  console.log(tempLevel);

  const uploadLevel = async (e) => {      
      console.log(tempLevel);
      await changeLevel(tempLevel);
      setCurrentLevel(tempLevel);
  }

  const levelChange = () => {      
      setChanging(!changing);     
  }

  const changeTempLevel = (selected) => {    
    setTempLevel(selected);
  }


    return (
      <div className="justify-center flex bg-base-200 rounded-[16px] p-2 grid grid-cols-1 gap-4 shadow-inner shadow-black" id="userBirthday">
      <h2 className="inline-flex text-accent-focus py-1 text-xl ">
        Level:
        <div className="ml-12 w-10 mr-12">{" "}</div>
        { gamerId == user.userID && (
          <button className="btn-ghost badge badge-outline text-xs ml-10 my-auto p-3 " onClick={levelChange}>
            <FaPencilAlt/>
          </button>
        )}         
      </h2>{" "}
      {!changing && (
          <h2 className="inline-flex text-neutral-content py-1 text-3xl">
              &nbsp;&nbsp;{
              currentLevel == "0" && (
                <p>NewBie</p>
              )}
              {
                currentLevel == "1" && (
                  <p>Veteran</p>
                )
              }
              {
                currentLevel == "2" && (
                  <p>Pro</p>
                )
              }
          </h2>
      )}
      {changing && (
           <form onSubmit={uploadLevel}>
              <LevelSelect handleChange={changeTempLevel} tempLevel={tempLevel}/>          
              <button type="submit"
              className='group align-middle float-right relative w-20 justify-center px-10 border border-transparent h-6 min-h-6 text-sm rounded-full btn btn-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus'>
              Submit</button>
          
         </form>
      )}
    
    </div>
    )
}

export default UserLevel;