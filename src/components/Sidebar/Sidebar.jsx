import { useContext } from "react";
import React from "react";
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { useState } from "react";
import { Context } from "../../context/Context";
const Sidebar=()=>{

  const [extended,setExtended]=useState(false);
  // add searched data
  const {onSent,prevPrompts,setRecentPrompt,newChat}=useContext(Context)

  //for loading everything from the sidebar to mainbar
  const loadPrompt=async(prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className="sidebar">
{/* top bar of sidebar */}
      <div onClick={()=>newChat()} className="top"> 
        <img className="menu" src={assets.menu_icon} onClick={()=>setExtended(prev=>!prev)} /> 
         {/* /*if prev is true it will return false */ }

        <div className="new-chat">
        <img src={assets.plus_icon} alt="" />
        {extended?<p>New Chat</p>:null}
        </div>

        {extended?
         <div className="recent">
         <p className="recent-title">Recent</p>
         {prevPrompts.map((item,index)=>{
          return (
            <div onClick={()=>{loadPrompt(item)}} className="recent-entry">
           <img src={assets.message_icon} alt="" />
           <p>{item.slice(0,18)}...</p>
         </div>
          )
         })}


       </div>:null
        }
      </div>

{/* bottom bar of sidebar */}
      <div className="botton">

        <div className="botton-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended?<p>Help</p>:null}
        </div>

        <div className="botton-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended?<p>History</p>:null}
        </div>

        <div className="botton-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended?<p>Settings</p>:null}
        </div>

        
      </div>
    </div>
  )
}
export default Sidebar;