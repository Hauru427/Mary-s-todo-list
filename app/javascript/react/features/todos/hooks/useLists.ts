import { useEffect, useState } from "react";
import { List } from '../types';

export const useLists = () => {
  const [lists, setLists] = useState<List[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    async function fetchLists() {
      setIsLoading(true)
      try {
        const response = await fetch('/lists')
        if (response.ok) {
          const data = await response.json()
          setLists(data)
        } else {
          console.log('サーバーエラーが発生しました。')
        }
      } catch (error) {
        console.log('リクエスト中にエラーが発生しました。')
      } finally {
        setIsLoading(false)
      }
    }
  fetchLists()
}, [])

return { lists, setLists, isLoading }
}