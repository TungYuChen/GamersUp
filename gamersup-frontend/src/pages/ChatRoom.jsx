import { useContext, useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import FriendComponent from '../components/account/FriendComponent';

const ws = socketIOClient('http://localhost:3000');
const useMountEffect = fun => useEffect(fun, []);

function ChatRoom() {
    const scrollRef = useRef(null); 
    const [ userList, setUserList ] = useState([]);   
    const user = JSON.parse(sessionStorage.getItem('user'));  
    

    useMountEffect(() => {        
        ws.on('joined_user', (data) => {
            if (data != null && data.userID > 0) {
                getMessage(data, 'join');                           
            }                
        });
        ws.on('message', data => {
           getMessage(data, "message");
        })    
        ws.on('left', data => {
            getMessage(data, "left");
        })    
        ws.on('user-list', data => {
            console.log(data);
            if (data != null)
                setUserList(data);
        })
        return () => {
            ws.off('joined_user');
            ws.off('message');
            ws.off('left');
            ws.off('user-list');
        }       
        
    }, [])
  

    useEffect(() => {
        if (user != null) {
            ws.emit('join', user);            
        }            
    }, [ws])

    const getMessage = (data, type) => {
        let messageBox = document.querySelector('.message');
        var scrollHeight = messageBox.scrollHeight;
        let messageContainer = document.createElement('div');
        switch (type) {
            case "message":
                messageContainer.innerText = data.username + ": " + data.message;
                break;
            case "join":
                messageContainer.innerText = data.userName + " joined the room";
                break;
            case "left":
                messageContainer.innerText = data.username + " left the room";
                break;
            default:
                break;
        }        
        messageContainer.classList.add('text-left');
        messageContainer.classList.add('m-2');
        messageBox.appendChild(messageContainer);
        scrollRef.current.scrollTo({
            behavior: 'smooth',
            top: scrollHeight
        });
         
    }
    
    
  

    const sendMessage = (e) => {
        if (document.querySelector('.messageInput').value == '')
            return;
        const message = document.querySelector('.messageInput').value;
        document.querySelector('.messageInput').value = '';        
        ws.emit('sendMessage', {
            username: user.userName,
            message: message
        })
    }




    return (
        <div className='grid grid-cols-5 gap-5'>
        <div className='card bg-base-200 shadow-xl mr-5 col-span-4' style={{height: "40rem"}}>
            <h1 className=' text-center text-xl mb-3 '>Chat Room</h1>           
            <div className='messageBox overflow-auto' style={{height: "33rem"}} ref={scrollRef}>              
                <div className='message'>
                </div> 
                 
            </div>
            <div>
                <input type='text' className='messageInput text-black mx-3' placeholder='Type your message here' style={{width: "85%"}} 
                onKeyUp={e => {                   
                    if (e.key === 'Enter') sendMessage();
                }}/>
                <button onClick={sendMessage} className='btn btn-primary m-2 px-7' style={{width: "10%"}}>Send</button>          
            </div>
           
        </div>
            <ul
                  tabIndex='0'
                  className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-60'>
                    {
                        Object.keys(userList).map(socketID => (                                                                      
                            <FriendComponent key={userList[socketID].userID} friend={userList[socketID]} />
                        ))
                    }
            </ul>            
        </div>
    )
}


export default ChatRoom;



