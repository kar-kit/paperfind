import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

const navigation = useNavigation();

function SignOutFunc() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      navigation.navigate("Login");
    })
    .catch((error) => {
      // An error happened.
      alert(error.message);
    });
}

export default SignOutFunc;
