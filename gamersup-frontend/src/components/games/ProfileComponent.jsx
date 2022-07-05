import { useContext, useState } from "react";
import GamesContext from "../../context/games/GamesContext";
import UserContext from "../../context/user/UserContext";
import PropTypes from "prop-types";
import GameListItem from "./GameListItem";
import Loading from "../layout/Loading";
import {Image, Video, Transformation} from 'cloudinary-react';
import {CloudinaryContext} from "cloudinary-react";
import {Uploady, UploadButton} from "@rpldy/uploady";
import axios from "axios";

function ProfileComponent() {
    const [imageSelected, setImageSelected] = useState("");
    const {userName, userEmail} = useContext(UserContext);
    console.log(userName);

    const uploadAvatar = async () => {
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "douglas_finalProject");

        axios.post('https://api.cloudinary.com/v1_1/mydouglasproject/image/upload', formData)
        .then((response) => console.log(response));


        // await axios.post("https://api.cloudinary.com/v1_1/mydouglasproject/image/upload -X POST --data 'file=<FILE>&timestamp=<TIMESTAMP>&api_key=<API_KEY>&signature=<SIGNATURE>'",
        // {
        //     file: "file",
        //     timestamp: "",
        //     api_key: "",
        //     signature: ""
        // })

    }

    return (
        <>
        <div className="avatar mt-8 justify-center">
          <div className="mb-2 w-36 h-36 mask mask-squircle">             
            <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" onClick={uploadAvatar} alt="No Avatar"/>                         
          </div>          
        </div>
        <div className="justify-center flex">
            <input type="file" className="pl-20" onChange={(e) => setImageSelected(e.target.files[0])} />  
        </div>
        
          <div className="justify-center flex">
            <h1 className="text-neutral-content py-1 text-3xl">{userName}</h1>
          </div>          
          <div className="justify-center flex">
              <h1 className="inline-flex text-neutral-content py-1 text-2xl">User Email: &nbsp;&nbsp;</h1> <h1 className="inline-flex text-neutral-content py-1 text-2xl">{userEmail}</h1>
          </div>
          <div className="justify-center flex">
              <h1 className="inline-flex text-neutral-content py-1 text-2xl">User BirthDay: &nbsp;&nbsp;</h1> <h1 className="inline-flex text-neutral-content py-1 text-2xl">2022.07.01</h1>
          </div>
          <div className="justify-center flex">
              <h1 className="inline-flex text-neutral-content py-1 text-2xl">User Level: &nbsp;&nbsp;</h1> <h1 className="inline-flex text-neutral-content py-1 text-2xl">2022.07.01</h1>
          </div>

        
        </>
    )

}






export default ProfileComponent;