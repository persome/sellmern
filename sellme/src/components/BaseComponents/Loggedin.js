import React from 'react'
// import { Link } from 'react-router-dom'
import {
    Dropdown,
    Avatar,
    Navbar,
    // Flowbite,
    // DarkThemeToggle,
} from 'flowbite-react'
import {Link} from 'react-router-dom'

function Loggedin() {
    return (
        <div>
            <div className="flex md:order-2 relative right-3">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                            Bonnie Green
                        </span>
                        <span className="block truncate text-sm font-medium">
                            name@flowbite.com
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to="/cart">Cart</Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
        </div >
    )
}

export default Loggedin