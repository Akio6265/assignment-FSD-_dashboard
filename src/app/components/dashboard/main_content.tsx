import React from "react";
import UAParser from "ua-parser-js";
const formattedDate = (dateString: Date) => {
  const options: any = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  };
  return new Date(dateString).toLocaleString("en-US", options);
};
const formatUserAgent = (userAgentString: any) => {
  const parser = new UAParser(userAgentString);
  const result = parser.getResult();
  const os = result.os.name || "Unknown OS";
  const browser = result.browser.name || "Unknown Browser";
  return `${os} - ${browser}`;
};
type MainContentProps = {
  userData: Array<{
    userAgent: string;
    active: boolean;
    updateAt: Date;
}>;
username:string;
  signout: (log: any) => void;
};
type MainContentProps_Admin = {
  admin_data: Array<{
    userAgent: string;
    active: boolean;
    updateAt: Date;
    username:string
  }>;
  signout: (log: any) => void;
};
export function Main_Content({ userData, signout, username }: MainContentProps) {
  return (
    <>
      {userData.map((log: any, index: number) => (
        <div key={index} className="device">
          <header>
            <div>
              <div>{formatUserAgent(log.userAgent)} </div>
              <div>
                User: <u>{username}</u>{" "}
              </div>
            </div>
            {log.userAgent === navigator.userAgent ? (
              <div>
                <button className="button-6" onClick={() => signout(log)}>
                  Sign Out
                </button>
              </div>
            ) : log.active ? (
              <button className="button-6" onClick={() => signout(log)}>
                Sign Out
              </button>
            ) : (
              <div>Recent Device</div>
            )}
          </header>
          <main className="centered">
            {log.userAgent === navigator.userAgent ? (
              <div>
                <div>
                  {" "}
                  <u>Current Device</u>
                </div>{" "}
                <div>
                  Last Login: <u>{formattedDate(log.updateAt)}</u>
                </div>
              </div>
            ) : (
              <div>
                Last Login: <u>{formattedDate(log.updateAt)}</u>
              </div>
            )}
          </main>
        </div>
      ))}
    </>
  );
}

export function Main_Content_Admin({ admin_data, signout, }: MainContentProps_Admin) {
  return (
    <>
      {admin_data.map((log: any, index: number) => (
        <div key={index} className="device">
          <header>
            <div>
              <div>{formatUserAgent(log.userAgent)} </div>
              <div>
                User: <u>{log.username}</u>
              </div>
            </div>
            {log.userAgent === navigator.userAgent ? (
              <div>
                <button className="button-6" onClick={() => signout(log)}>
                  Sign Out
                </button>
              </div>
            ) : log.active ? (
              <button className="button-6" onClick={() => signout(log)}>
                Sign Out
              </button>
            ) : (
              <div>Recent Device</div>
            )}
          </header>
          <main className="centered">
            {index === 0 ? (
              <div>
                <div>
                  {" "}
                  <u>Current Device</u>
                </div>{" "}
                <div>
                  Last Login: <u>{formattedDate(log.updateAt)}</u>
                </div>
              </div>
            ) : (
              <div>
                Last Login: <u>{formattedDate(log.updateAt)}</u>
              </div>
            )}
          </main>
        </div>
      ))}
    </>
  );
}
