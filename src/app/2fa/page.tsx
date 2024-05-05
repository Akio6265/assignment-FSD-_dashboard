"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import api from "../apis.json";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [imageData, setImageData] = useState("");
  const [code, setCode] = useState("");
  useEffect(() => {
    async function getImage() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          router.push("/login");
          return;
        }
        const res = await fetch(api.qrImage, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const jsonData = await res.json();
        const {
          data: { image },
        } = jsonData;
        setImageData(image);
      } catch (e) {
        console.error(e);
      }
    }
    getImage();
}, []); 
async function OnSubmit(e: FormEvent) {
    e.preventDefault();
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
              router.push("/login");
              return; 
            }
            const res = await fetch(api.TFA, {
                method:"POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            body:JSON.stringify({
                data:{
                    code
                }
            })
            });
            if(res.ok){
                router.push("/dashboard");
            }
            else{
              alert("Invalid code")
            }
}
const handle2faCode = (event: ChangeEvent<HTMLInputElement>) => {
  setCode(event.target.value);
};
  return (
    <div
      id="image"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#2d2d31",
      }}
    >
      <img id="qrCode" src={imageData} alt="" />
      <form onSubmit={OnSubmit} style={{ marginTop: "20px" }}>
        <label
          htmlFor="code"
          style={{ display: "block", marginBottom: "10px", color: "white" }}
        >
          Code
        </label>
        <input
          id="code"
          type="text"
          name="code"
          placeholder="2FA code"
          value={code}
          onChange={handle2faCode}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button
          type="submit"
          style={{
            padding: "5px 10px",
            backgroundColor: "#3C5B6F",
            color: "white",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
