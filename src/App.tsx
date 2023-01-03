import { useCallback, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const [tickInterval, setTickInterval] = useState<any>();

  const toggleRefresh = useCallback(
    (status: boolean) => {
      console.log("clicked");

      if (status) {
        console.log("turning on ticking");
        let i = setInterval(() => {
          console.log("this will run every second");
          const requestOptions: any = {
            method: "GET",
            credentials: "include",
          };

          fetch(`/refresh`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if (data.access_token) {
                setAccessToken(data.access_token);
              }
            })
            .catch((e) => {
              console.log("error refreshing token", e);
            });
        }, 600000);
        setTickInterval(i);
        console.log("setting tick interval to", i);
      } else {
        console.log("turning off ticking");
        console.log("turning off tickInterval", tickInterval);
        setTickInterval(null);
        clearInterval(tickInterval);
      }
    },
    [tickInterval]
  );

  useEffect(() => {
    if (accessToken === "") {
      const requestOptions: any = {
        method: "GET",
        credentials: "include",
      };

      fetch(`/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setAccessToken(data.access_token);
            toggleRefresh(true);
          }
        })
        .catch((e) => {
          console.log("error refreshing token", e);
        });
    }
  }, [accessToken, toggleRefresh]);

  return (
    <div className="max-w-screen-lg m-auto px-4">
      <Header
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        toggleRefresh={toggleRefresh}
      />
      <div className="flex">
        {accessToken === "" ? null : <Sidebar />}
        <main className="w-full">
          <Outlet
            context={{
              accessToken,
              setAccessToken,
              isError,
              setIsError,
              toggleRefresh,
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
