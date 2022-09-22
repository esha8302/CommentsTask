import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div>
            <button className='btn'><Link to="/blogs">See All Blogs Here</Link></button>
            
    </div>
  )
}

export default Home