'use client'
import { useContext, useEffect, useState } from "react";
import { AuthStoreContext } from "@/context/AuthStoreContext";
import { observer } from 'mobx-react-lite';
import Boards from "@/components/Boards";
import { availableStatuses } from "@/models/response/TodoResponse";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"


const Home = () => {
  const router = useRouter();
  const { AuthStore } = useContext(AuthStoreContext);

  return (
    <div className=" w-auto h-full flex flex-col justify-center gap-4 items-center py-7">
      {AuthStore.isAuth && <Boards isSingle={true} id={AuthStore.user.id} types={availableStatuses} />}
    </div>
  );
}

export default observer(Home);