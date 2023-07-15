import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import RootLayout from "./components/layouts/RootLayout";
import { auth } from "./lib/firebase";
import { setLoading, setUser } from "./redux/features/user/userSlice";
import { useAppDispatch } from "./redux/hook";



function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);
  return (
    <div className="App"
    >
      <RootLayout />
    </div>
  );
}

export default App;
