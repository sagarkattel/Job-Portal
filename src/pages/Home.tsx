import React from 'react'
import { Head } from '../components/Head'
import { Search } from '../components/Search'
import { Jobs } from '../components/Jobs'


export const Home = () => {

  return (
    <div>
        <Head />
        <Search />
        <Jobs />
    </div>
  )
}
