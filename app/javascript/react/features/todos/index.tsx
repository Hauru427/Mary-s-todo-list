import React, { useState } from "react";
import { useLists } from './hooks/useLists';
import List from './components/List';
import ListCreateForm from "./components/ListCreateForm";
import SearchQuery from "./components/SearchQuery";
import Loading from "./components/ui/Loading"
import { FaRegPlusSquare } from 'react-icons/fa';

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

      {lists.length === 0 && (
        <div className="mx-4 mt-2 p-3 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '5px',
          border: '1px solid #f5c6cb',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        左下の
        <FaRegPlusSquare style={{ margin: '0 8px' }} />
        ボタンよりリストを追加してください。
      </div>
    )}
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