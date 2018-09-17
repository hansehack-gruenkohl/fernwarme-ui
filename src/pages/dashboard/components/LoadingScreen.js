import React from "react";
import "./LoadingScreen.css";

// taken from https://codepen.io/rachsmith/pen/xGrjvB

export default function LoadingScreen() {
    return (
        <div className="LoadingScreen">
            <div className="drop-outer">
                <svg className="drop" viewBox="0 0 40 40" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20"/>
                </svg>
            </div>
            <div className="ripple ripple-1">
                <svg className="ripple-svg" viewBox="0 0 60 60" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="24"/>
                </svg>
            </div>
            <div className="ripple ripple-2">
                <svg className="ripple-svg" viewBox="0 0 60 60" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="24"/>
                </svg>
            </div>
            <div className="ripple ripple-3">
                <svg className="ripple-svg" viewBox="0 0 60 60" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="24"/>
                </svg>
            </div>
        </div>
    )
}
