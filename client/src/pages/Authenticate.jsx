import { useRouter } from "next/router";
import { useEffect } from "react";
// import PocketBase from "pocketbase";
import { pb } from "../../utils/pocketBase";

const RedirectPage = () => {
  const router = useRouter();
  const { code, state } = router.query;
  const redirectUrl = "http://127.0.0.1:8090/redirect.html";
  // const provider = JSON.parse(localStorage.getItem("provider"));
  // const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKET_URL);

  useEffect(() => {
    // if (provider.state !== state) {
    //   throw "State parameters don't match.";
    // }

    pb.collection("users")
      .authWithOAuth2(provider.name, code, provider.codeVerifier, redirectUrl, {
        emailVisibility: false,
      })
      .then((authData) => {
        console.log(authData);
      })
      .catch((err) => {
        console.error("Failed to exchange code.", err);
      });
  }, []);

  return <pre>Authenticating...</pre>;
};

export default RedirectPage;
