import React, { useState } from "react";
import { useLists } from './hooks/useLists';
import List from './components/List';
import ListCreateForm from "./components/ListCreateForm";
import SearchQuery from "./components/SearchQuery";
import Loading from "./components/ui/Loading"

export default function Todos() {
  const { lists, setLists, isLoading } = useLists();
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return (
      <div className="m-4">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <div className="mx-4 mt-4 d-flex" style={{ maxHeight: '10%' }}>
        <SearchQuery
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="my-4 d-flex overflow-auto" style={{ maxHeight: '90%' }}>
        <List
          lists={lists}
          setLists={setLists}
          searchQuery={searchQuery}
        />
        <ListCreateForm
          lists={lists}
          setLists={setLists}
        />
      </div>
    </>
  );
  }