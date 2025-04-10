import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
    const [toggleNav, setToggleNav] = useState(false);

    return (
        <nav className="bg-red-950 p-4 w-screen">
            <div className="flex items-center justify-between">
                {/* Desktop Nav */}
                <div className="text-white text-2xl font-semibold">
                    <ul className="hidden md:flex space-x-4">
                        <li>
                            <Link to="/" className="hover:text-red-50">
                                <h1>D&D Spell Decks</h1>
                            </Link>
                        </li>
                        <li>
                            <Link to="/spell-decks" className="hover:text-red-50">
                                <h1>My Spell Decks</h1>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Mobile Nav */}
                <div onClick={() => setToggleNav(!toggleNav)}className="md:hidden cursor-pointer">
                    {toggleNav ? < FaTimes size={20} color="white" />  : < FaBars size={20} color="white" />}
                    </div>
                    {toggleNav && ( 
                        <ul className="md:hidden absolute left-0 top-8 w-screen bg-red-950 space-y-4 flex justify-end items-end">
                        <li>
                            <Link to="/" className="block font-bold px-4 py-2 text-white hover:text-gray-300">
                                <h1>D&D Spell Decks</h1>
                            </Link>
                        </li>
                        <li>
                            <Link to="/spell-decks" className="block font-bold px-4 py-2 text-white hover:text-gray-300">
                                <h1>My Spell Decks</h1>
                            </Link>
                        </li>
                    </ul>
                    )}
                </div>    
        </nav>
    )
}

export default Navbar;