import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import buildspaceLogo from "../assets/buildspace-logo.png";
import Button from '@mui/material/Button';
import { Link } from "@mui/material";

const Home = () => {
  const [userInput, setUserInput] = useState("");

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }  

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate a quote for socials</h1>
          </div>
          <div className="header-subtitle">
            <h2>type a subject and find matching quotes</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="start typing here"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
        </div>
        <div className="prompt-buttons">
          <Button variant="contained" color="success" onClick={callGenerateEndpoint}>
            Generate
          </Button>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}        
      </div>
      <div className="footer">
        <Link href="https://buildspace.so/p/build-ai-writing-assistant-gpt3" target="_blank" underline="none">
          <Button variant="outlined" color="info">
            A Buildspace project
          </Button>
        </Link>
        <Link href="https://twitter.com/traderwally7" target="_blank" underline="none">
          <Button variant="outlined" color="info">
            Built by: coderwally<br/> (a.k.a. @traderwally7) 🐤
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
