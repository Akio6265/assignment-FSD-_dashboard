import React from "react";
export function Heading() {
    return (
        <>
        <div className="heading centered">
    <h1>Manage Account</h1>
    <h4>
      These signed-in devices have recently been active on this account. You can{" "}
      <u>sign out</u> unfamiliar devices
    </h4>
  </div>
        </>
)
}

export function Admin_Heading() {
  return (
    <>
      <div className="heading centered">
        <h1>Admin Account</h1>
        <h4>
          As the admin, you have access to all user activities
        </h4>
      </div>
    </>
  );
}