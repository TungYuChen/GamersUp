import { useContext, useState } from "react";
import UserContext from "../../../context/user/UserContext";
import { FaPencilAlt } from "react-icons/fa";
import Moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UserBirthday({gamerId, dob}) {
    const { user, changeBirthday } = useContext(UserContext);
    const [ newBirthday, setNewBirthDay] = useState(dob);
    const [ birthday, setBirthday] = useState(dob);    
    const [ changing, setChanging ] = useState(false);

    const uploadBirthday = async (e) => {     
        
        console.log(newBirthday);        
        changeBirthday(newBirthday);
        setBirthday(newBirthday);
        birthdayChange();
    }

    const birthdayChange = () => {      
        setChanging(!changing);
        setNewBirthDay(birthday);     
    }


    return (
        <div className="justify-center flex bg-base-200 rounded-[16px] p-2 grid grid-cols-1 gap-4 shadow-inner shadow-black" id="userBirthday">
        <h2 className="inline-flex text-accent-focus py-1 text-xl">
          BirthDay:{" "}
          { (user.userID == gamerId) && (
            <button className="btn-ghost badge badge-outline text-xs mx-4 my-auto p-3 absolute right-12" onClick={birthdayChange}>
                <FaPencilAlt/>
            </button>
          )}           
        </h2>{" "}
        {!changing && (
            <h2 className="inline-flex text-neutral-content py-1 text-3xl">
                &nbsp;&nbsp;{Moment(birthday).format("DD-MMM-YYYY")}
            </h2>
        )}
        {changing && (
             <div>
                <DatePicker className="text-black" selected={new Date(newBirthday)} id="datepicker" onChange={(newDate) => setNewBirthDay(new Date(newDate))} />      
                <button type="submit" onClick={uploadBirthday}
                className='group align-middle float-right relative w-20 justify-center px-10 border border-transparent h-6 min-h-6 text-sm rounded-full btn btn-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus'>
                Submit</button>
            </div>
           
        )}
      
      </div>
    )
}

export default UserBirthday;