import runChat from "../config/infostack";

import { createContext, useState } from "react";

export const Context=createContext();

const ContextProvider=(props)=>{

  const [input,setInput]=useState("");
  const [recentPrompt,setRecentPrompt]=useState("");
  const [prevPrompts,setPrevPrompts]=useState([]);
  const [showResult,setShowResult]=useState(false);
  const [loading,setLoading]=useState(false);
  const [resultData,setResultData]=useState("");

  // for typing effect
  const delayPara=(index,nextWord)=>{
  setTimeout(function(){
    setResultData(prev=>prev+nextWord);
  },75*index);
  }

  //when clicked on new chat
  const newChat=()=>{
    setLoading(false)
    setShowResult(false)
  }

  //on sent function
  const onSent=async(prompt)=>{
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if(prompt!=undefined){
      response=await runChat(prompt);
      setRecentPrompt(prompt)
    }
    else{
      setPrevPrompts(prev=>[...prev,input])
      setRecentPrompt(input)
      response=await runChat(input)

    }
    // for removing ** from start and bolding it
    let responseArray=response.split("**");
    //for hataing undefined
    let newResponse="";
    for(let i=0;i<responseArray.length;i++)
    {
      if(i===0 || i%2!==1){
        newResponse+=responseArray[i];
      }
      else{
        newResponse+="<b>"+responseArray[i]+"</b>";
      }
    }
    // * for new line
    let newResponse2=newResponse.split("*").join("</br>")
    let newResponseArray=newResponse2.split(" ");
    for(let i=0;i<newResponseArray.length;i++)
    {
      const nextWord=newResponseArray[i];
      delayPara(i,nextWord+" ")
    }
    setLoading(false)
    setInput("")
  }
  const contextValue={
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  }
  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}
export default ContextProvider