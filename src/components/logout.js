import React from "react";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";

const clientID =
  "761501369349-o70hbrrm16jvbm924h9vk40r7k127bq2.apps.googleusercontent.com";

function Logout() {
  const history = useHistory();
  const onSuccess = (_res) => {
    history.push("/login");
  };
  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientID}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
        className="w-36 h-10"
      />
    </div>
  );
}

export default Logout;
