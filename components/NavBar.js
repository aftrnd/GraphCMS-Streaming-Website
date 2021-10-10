import Link from 'next/Link'
import Image from 'next/Image'
import logo from '../public/Netflix-Logo.png'

const NavBar = ({account}) => {
    return (
        <div className="navbar">
            <div className="logo-wrapper">
                <Link href="/"><Image src={logo} alt="Streaming Logo" width={120} height={50.4}/></Link>
            </div>

            <div className="account-info">
                <p>Hello, {account.username}</p>
                <img className="avatar" src={account.avatar.url}/>
            </div>
        </div>
    )
}

export default NavBar