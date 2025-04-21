import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { UserAuth } from '@/context/AuthContext'

function NavBar() {
  const {session, signOut } = UserAuth();  
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate('/');
  }

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-lg font-bold"><Link to="/dashboard">Poll Maker</Link></span>
        </div>
        <div className="flex space-x-4">
          {session ? (
            <Button className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 py-2 px-4 rounded" onClick={handleSignOut}>Sign Out</Button>
          ) : (
            <>
              <Link to="/login">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 py-2 px-4 rounded">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 py-2 px-4 rounded">Signup</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar