import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import NavBar from '../components/NavBar'

function Home() {
  return (
    <div className='text-white w-full h-screen min-h-screen bg-gray-900 overflow-y-auto scrollbar-hide'>
        <NavBar />
        <div className='w-[90%] md:w-[80%] h-screen flex flex-col justify-center items-center mx-auto mt-16'>
            <div className='w-full md:w-3xl text-center px-4'>
                <p className='text-3xl md:text-5xl font-extrabold mb-4'>Poll Maker</p>
                <p className='text-lg md:text-xl text-gray-300 mb-8'>Create interactive polls to engage your audience and make your presentations dynamic and memorable.</p>
                <Button variant="outline" className="bg-blue-600 text-white border-blue-600 hover:bg-transparent hover:text-blue-600 transition duration-300 cursor-pointer mt-4 px-6 py-3 text-base md:text-lg font-semibold">
                    <Link to="/signup">Get Started</Link>
                </Button>
            </div>
            <div className='w-full md:w-3xl mt-8'>
                <video src={"/Features_Polling_small.mp4"} autoPlay muted loop className='w-full h-full object-cover rounded-lg shadow-lg'/>
            </div>
        </div>
    </div>
  )
}

export default Home