import React from "react";
import { useLists } from './hooks/useLists';
import List from './components/List';
import ListCreateForm from "./components/ListCreateForm";
import Loading from "./components/ui/Loading"

export default function Todos() {
  const { lists, setLists, isLoading } = useLists();

  if (isLoading) {
    return (
      <div className="m-4">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <div className="my-4 d-flex overflow-auto" style={{ maxHeight: '90%' }}>
        <List
          lists={lists}
          setLists={setLists}
        />
        <ListCreateForm
          lists={lists}
          setLists={setLists}
        />
      </div>
    </>
  );
  }