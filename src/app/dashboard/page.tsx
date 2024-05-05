"use client";
import { useState, useEffect } from "react";
import "./dashboard.css";
import api from "../apis.json";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { Main_Content, Main_Content_Admin } from "../components/dashboard/main_content";
import {
  Heading,
  Admin_Heading,
} from "../components/dashboard/heading";

export default function dashboard() {
  const router = useRouter();
  const socket = io(api.socket);
  const [adminData, setAdminData] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [userData, setUserData] = useState([]);
  const [username, setusername] = useState("");
  const fetchUserData = async () => {
    try {
      let accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/login");
      }
      const response = await fetch(api.dashboard, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        router.push("/login");
      }
      const data = await response.json();
      console.log(data);
      const {  admin } = data;
      if (admin) {
        setAdmin(admin);
        const { admin_data } = data;
        const currentAgent = navigator.userAgent;
 const index = admin_data.findIndex(
   (log: any) => log.username === "SHIVAM" && log.userAgent === currentAgent
 );
        if (index !== -1) {
          let Current_agent_log = admin_data[index];
          admin_data.splice(index, 1);
          admin_data.unshift(Current_agent_log);
        }
        setAdminData(admin_data);
      } else {
        //putting the current userAgent to 0th index or at 1st place
        const { userLogs,name } = data;
        const currentAgent = navigator.userAgent;
        const index = userLogs.findIndex(
          (log: any) => log.userAgent === currentAgent
        );
        if (index !== -1) {
          let Current_agent_log = userLogs[index];
          userLogs.splice(index, 1);
          userLogs.unshift(Current_agent_log);
        }
        setusername(name)
        setUserData(userLogs);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    socket.on("userLoggedIn", () => {
      fetchUserData();
    });
            socket.on("userSignOut", (data) => {
              fetchUserData();
            });
    fetchUserData();
    
  }, []);
  async function handleSignOut(log: string) {
    try {
      let accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/login");
      }
      const response = await fetch(api.signout, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          data: {
            log,
          },
        }),
      });
      if (!response.ok) {
        router.push("/login");
        return;
      } else {
        const JSON_data = await response.json();
        const { data } = JSON_data;
        if (data.userAgent === navigator.userAgent) {
          router.push("/login");
          return;
        }

      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div id="dashboard">
      <div>
        {admin ? <Admin_Heading /> : <Heading />}
        <div id="devices">
          {admin ? (
            <Main_Content_Admin admin_data={adminData} signout={handleSignOut}/>
          ) : (
            <Main_Content userData={userData} signout={handleSignOut} username={username} />
          )}
        </div>
      </div>
    </div>
  );
}
