import {useState, useEffect} from 'react'
import {client} from '../lib/client'
const useCategory = () => {
  const [categories, setCategories] = useState()

  useEffect(() => {
    const query = "*[_type == 'category']"
    client.fetch(query).then((data) => {
      setCategories(data)
    })
  },[])

  return [categories, setCategories]
}

export default useCategory