import React, { useContext } from "react";
import './Main.css'
import {assets} from '../../assets/assets'
import { Context } from "../../context/Context";
const Main=()=>{

  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context)

  return (
    <>
    <div className="main">
      {/* nav section */}
      <div className="nav">
        <p>InfoStack</p>
        <img src={assets.user_icon} alt="" />
      </div>
  
{/* container section */}
      <div className="main-container">

        {!showResult?<>
          <div className="greet">
          <p><span>Hello, Aadrika!</span></p>
          <p>How can I help you today?</p>
        </div>

        <div className="cards">
          <div className="card">
          <p>Suggest beautiful places to see on upcming road trip</p>
          <img src={assets.compass_icon} alt="" />
          </div>
          
          <div className="card">
          <p>Briefly summarise this concept:urban planning</p>
          <img src={assets.bulb_icon} alt="" />
          </div>
          
          <div className="card">
          <p>Brainstorm team bonding activities for our work retreat</p>
          <img src={assets.message_icon} alt="" />
          </div>
          
          <div className="card">
          <p>Improve the readability of the following code</p>
          <img src={assets.code_icon} alt="" />
          </div>
          
        </div>
        </>:<div className="result">
          <div className="result-title">
            <img src={assets.user_icon} className="my" alt="" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading?
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>
            }
          </div>
          </div>}

      </div>

      {/* bottom section */}
      <div className="main-bottom">
        <div className="search-box">
        <input onChange={(event)=>{setInput(event.target.value);}}  value={input} type="text" placeholder="Enter a prompt here"/>
        <div>
          <img src={assets.gallery_icon} alt="" />
          <img src={assets.mic_icon} alt="" />
          {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
        </div>
        </div>
        <div className="bottom-info">
          <p>InfoTech may display inaccurate info, including about people, so double check its responces. Your privacy and InfoTech Apps</p>
        </div>
      </div>
    </div>
    </>
  )
}
export default Main;