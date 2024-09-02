import React from 'react';

type Props = {
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchQuery({ searchQuery, setSearchQuery }: Props) {
  return (
    <input
      type="text"
      className="form-control corm-control-lg mb-1 w-100"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Filter by keyword or by field"
    />
  )
}