import { Link } from "react-router-dom"
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className="bg-red-950 text-white p-4 flex justify-between items-center">
            <h1 className="header-title font-bold">D&D Spell Decks</h1>

            <div className="space-x-4">
                <Link to="/" className="!text-white hover:!text-gray-200">Spells</Link>
                <Link to="/spell-deck" className="!text-white hover:!text-gray-200">Spell Deck</Link>
            </div>
        </nav>
    );
};

export default Navbar