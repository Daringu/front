'use client'
import { useContext, useState } from "react";
import { AuthStoreContext } from "@/context/AuthStoreContext";
import { observer } from 'mobx-react-lite';
import Boards from "@/components/Boards";
import { availableStatuses } from "@/models/response/TodoResponse";
import { useRouter } from "next/navigation";
import TodoStore from "@/stores/TodoStore";

const Home = () => {
  const { AuthStore } = useContext(AuthStoreContext);
  const [todoStore, setTodoStore] = useState<TodoStore>(() => { return new TodoStore('single', AuthStore.user.id) })
  return (
    <div className=" w-auto h-full flex flex-col justify-center gap-4 items-center py-7">
      {AuthStore.isAuth && <Boards todoStore={todoStore} mode={'single'} teamId={AuthStore.user.id} types={availableStatuses} />}
    </div>
  );
}

export default observer(Home);