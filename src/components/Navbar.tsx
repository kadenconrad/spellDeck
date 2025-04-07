import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-red-950 p-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="text-white text-2xl font-bold">
                    <ul className="hidden md:flex space-x-4">
                        <li>
                            <Link to="/">
                                <h1>D&D Spell Decks</h1>
                            </Link>
                        </li>
                        <li>
                            <Link to="/spell-decks">
                                <h1>My Spell Decks</h1>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;