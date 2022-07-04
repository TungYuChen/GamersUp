import { useContext, useState } from "react";
import { FiThumbsUp } from 'react-icons/fi';
import UserContext from "../../context/user/UserContext";
import AlertContext from "../../context/alert/AlertContext";
import axios from "axios";

function ProfileComponent() {
  const { setAlertWithTimeout } = useContext(AlertContext);
    const [imageSelected, setImageSelected] = useState("");
    const {userName, userEmail} = useContext(UserContext);
    console.log(userName);
    const [imageUrl, setImageUrl] = useState("");



    const uploadAvatar = async () => {
        if (imageSelected === "") {
          setAlertWithTimeout('Please select an avatar!! ', 'information')
        } else {
          const formData = new FormData();
          formData.append("file", imageSelected);
          formData.append("upload_preset", "douglas_finalProject");
  
          axios.post('https://api.cloudinary.com/v1_1/mydouglasproject/upload', formData)
            .then((response) => setImageUrl(response.data.url))
            .catch((error => {setAlertWithTimeout("The file is too huge!!", 'information')}));  
        }
      
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
        <div className="grid grid-cols-[2fr_3fr] gap-4">
          <div id="left">
        <div className="justify-center flex ">
            <h1 className="text-neutral-content py-2 text-4xl shadow-inner shadow-black bg-secondary-focus px-4 rounded-[16px] mt-2">{userName}</h1>
        </div>    
        <div className="avatar mt-4 justify-center mx-auto flex mb-6">
          <div className="mb-2 w-64 h-64 mask mask-squircle ">          
            { (imageUrl === "") && (<img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" alt="No Avatar"/>)}       
            { (imageUrl !== "") && (<img src={imageUrl} alt="No Avatar"/>)}                                    
          </div>                 
        </div>
        <div className="justify-center flex mb-6">
          <form className="flex items-center space-x-6">      
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input type="file" className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              " onChange={(e) => {             
                setImageSelected(e.target.files[0])               
                }} accept="image/*"/>
            </label>
          </form>
            <button type="submit" className="rounded-full bg-primary px-10 " onClick={uploadAvatar} > Upload </button>
        </div>   
        </div>
        <div id="right" className="bg-neutral px-10 pt-2 " >  
        <div className="justify-center flex ">
            <h1 className="text-neutral-content py-2 text-4xl  px-4 rounded-[16px] mb-4">Details</h1>
        </div>   
        <div id="detailInnerGrid" className="grid grid-cols-2 gap-4">
          <div className="justify-center flex bg-base-200 rounded-[16px] p-5 grid grid-cols-1 gap-4 shadow-inner shadow-black">
            <h2 className="inline-flex text-accent-focus py-1 text-xl">Email:</h2>
            <h2 className="inline-flex text-neutral-content py-1 text-3xl"> &nbsp;&nbsp;{userEmail}</h2>             
          </div>
          <div className="justify-center flex bg-base-200 rounded-[16px] p-5 grid grid-cols-1 gap-4 shadow-inner shadow-black">
            
              <h2 className="inline-flex text-accent-focus py-1 text-xl">BirthDay: </h2> <h2 className="inline-flex text-neutral-content py-1 text-3xl">&nbsp;&nbsp;2022.07.01</h2>
          </div>
          <div className="justify-center flex bg-base-200 rounded-[16px] p-5 grid grid-cols-1 gap-4 shadow-inner shadow-black">
              <h2 className="inline-flex text-accent-focus py-1 text-xl">Game Level: </h2> <h2 className="inline-flex text-neutral-content py-1 text-3xl">&nbsp;&nbsp;Noob</h2>
          </div>
          <div className="justify-center flex bg-base-200 rounded-[16px] p-5 grid grid-cols-1 gap-4 shadow-inner shadow-black">
              <h2 className="inline-flex text-accent-focus py-1 text-xl">Likes : </h2>
              <div>
              <h2 className="inline-flex text-neutral-content py-1 text-3xl">&nbsp;&nbsp;1000</h2>
                  <button className='btn-ghost badge badge-outline text-xs hover:bg-primary-focus mx-4 my-auto p-3'>
                <FiThumbsUp className='inline mr-1 w-5 py-auto mx-2' />         
              </button></div>
            
          </div>
          </div>
        </div>
        </div>   
        
        </>
    )

}






export default ProfileComponent;