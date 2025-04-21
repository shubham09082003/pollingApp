import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import NavBar from '../components/NavBar'

function Home() {
  return (
    <div className='text-white w-full h-screen overflow-hidden'>
        <NavBar />
        <div className='w-[80%] h-screen flex justify-center items-center mx-auto'>
            <div className='w-3xl'>
                <p className='text-4xl font-bold'>Poll maker - Create interactive polls</p>
                <p className='text-lg text-gray-400 mt-4'>It gives you the power to design a wide variety of interactive polls. Polling your audience can be the most effective way to increase engagement and make a presentation dynamic and memorable.</p>
                <Button variant="outline" className="bg-transparent text-white hover:bg-transparent hover:text-white cursor-pointer mt-4"><Link to="/signup">Get Started</Link></Button>
            </div>
            <div className='w-3xl'>
                <video src={"/Features_Polling_small.mp4"} autoPlay muted loop className='w-full h-full object-cover'/>
            </div>
        </div>
    </div>
  )
}

export default Home