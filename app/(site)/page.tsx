'use client'
import { useContext, useEffect } from "react";
import { AuthStoreContext } from "../_context/AuthStoreContext";
import { useRouter } from "next/navigation";
import { observer } from 'mobx-react-lite';

const Home = () => {
  const { AuthStore } = useContext(AuthStoreContext)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      AuthStore.checkAuth();
      return;
    }
  }, [])
  if (AuthStore.isLoading) {
    return <h1>Loading...</h1>
  }
  return (
    <div onClick={() => console.log(AuthStore.user)
    }>
      Hello page!

      {AuthStore.isAuth ? <>
        <h1>You can now do what ever you want</h1>
        <button onClick={() => AuthStore.logout()} className="px-4 py-4 border-solid border-lime-100">log out
        </button></> : <h1>Create an account or log in to continue! <button onClick={() => router.push('/auth')}>Log in</button></h1>}
    </div>
  );
}

export default observer(Home);