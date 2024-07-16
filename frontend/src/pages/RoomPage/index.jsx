import React from 'react';
import {useParams} from "react-router-dom";
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt';
const RoomPage=()=>{
    const {roomId} = useParams();
    const myMeeting= async(element)=>{
        const appID=1311514259;
        const serverSecret="36c1ab0befbd7741bf3630d76131bcd5";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,serverSecret,roomId,
            Date.now().toString(),
            "Priyanka Sahu"
        );
        const zc= ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom(
            {
               container:element, 
               sharedLinks:[
                {
                    name:'Copy Link',
                    url:`${window.location.origin}/room/${roomId}`,

                }
               ],
               scenario:{
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
               },
               maxUsers:2,
               showScreenSharingButton:true,
            }
        );
        
    };
    return <div>
        <div ref={myMeeting}/>
    </div>;
};
export default RoomPage;