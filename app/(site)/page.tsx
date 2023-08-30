'use client'
import { useContext, useEffect, } from "react";
import { AuthStoreContext } from "@/context/AuthStoreContext";
import { observer } from 'mobx-react-lite';
import AddButton from "@/components/AddButton";
import { TodoStoreContext } from "@/context/TodoStoreContext";
import ModalCreateTodo from "@/components/ModalCreateTodo";
import Boards from "@/components/Boards";
import { availableStatuses } from "@/models/response/TodoResponse";

const Home = () => {
  const { AuthStore } = useContext(AuthStoreContext);
  const { todoStore } = useContext(TodoStoreContext);


  useEffect(() => {
    if (localStorage.getItem('token')) {
      AuthStore.checkAuth();
      return;
    }
  }, [])


  const addtodo = () => {
    todoStore.setCreateTodoOpen()
  }


  return (
    <div className=" w-auto h-full flex flex-col justify-center gap-4 items-center py-7">
      <ModalCreateTodo statuses={availableStatuses} />
      {AuthStore.isAuth && <Boards types={availableStatuses} />}
      <AddButton onClick={addtodo} />
    </div>
  );
}

export default observer(Home);