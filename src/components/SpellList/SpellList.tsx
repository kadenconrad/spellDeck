import { useState, useEffect, useMemo } from 'react';
import { Spell } from '../../interfaces/types'
import { SpellCard } from '../SpellCard/SpellCard';
import { getAllSpells } from '../../services/spellService';

export const SpellList = ({ 
    collapsed = false,
    onSpellSelect,
    selectedSpell
}: { 
    collapsed?: boolean;
    onSpellSelect?: (spell: Spell) => void;
    selectedSpell?: Spell | null;
}) => {
    // Primary State
    const [spells, setSpells] = useState<Spell[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter State
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedLevel, setSelectedLevel] = useState<number>(-1);
    const [selectedSchool, setSelectedSchool] = useState<string>('');
    const [selectedCastingTime, setSelectedCastingTime] = useState<string>('');
    const [selectedDuration, setSelectedDuration] = useState<string>('');
    const [selectedRange, setSelectedRange] = useState<string>('');
    const [selectedComponents, setSelectedComponents] = useState<string>('');
    const [searchName, setSearchName] = useState<string>('');
    
    // Pagination State
    const [page, setPage] = useState(1);
    const spellsPerPage = 8;


    useEffect(() => {
        const loadAllSpells = async () => {
            setLoading(true);
            try {
                const { spells: allSpells } = await getAllSpells();
                setSpells(allSpells);
            } catch (error) {
                console.error('Error loading spells:', error);
            } finally {
                setLoading(false);
                setPage(1);
            }
        };
        loadAllSpells();
    }, []); // Run only once on mount

    // reset page to 1 and scroll to top when filters change
    useEffect(() => {
        setPage(1);
        window.scrollTo({top: 0, behavior: 'smooth'});
  },[selectedClass, selectedLevel, selectedSchool, selectedCastingTime, selectedDuration, selectedRange, selectedComponents, searchName]);

    // Filtering and pagination
    const filteredSpells = useMemo(() => {
        let result = [...spells];

        if (selectedClass) {
            result = result.filter(spell => spell.classes.includes(selectedClass));
        }
        if (selectedLevel !== null) {
            result = result.filter(spell => spell.level >= selectedLevel);
        }
        if (selectedSchool) {
            result = result.filter(spell => spell.school === selectedSchool);
        }
        if (selectedCastingTime) {
            result = result.filter(spell => spell.castingTime === selectedCastingTime);
        }
        if (selectedDuration) {
            result = result.filter(spell => spell.duration === selectedDuration);
        }
        if (selectedRange) {
            result = result.filter( spell => {
                if (selectedRange === "Self" || selectedRange === "Touch") {
                    return spell.range === selectedRange;
                }

                const selectedRangeMatch = selectedRange.match(/(\d+)/);
                const spellRangeMatch = spell.range.match(/(\d+)/);

                if (selectedRangeMatch && spellRangeMatch) {
                    const selectedDistance = parseInt(selectedRangeMatch[0]);
                    const spellDistance = parseInt(spellRangeMatch[0]);
                    return spellDistance >= selectedDistance;
                }
                return spell.range === selectedRange;
            });
        }
            
        if (selectedComponents) {
            result = result.filter(spell =>spell.components.join(', ') === selectedComponents);
        }
        if (searchName) {
            result = result.filter(spell => spell.name.toLowerCase().includes(searchName.toLowerCase()))
        }
        return result;
    }, [spells, selectedClass, selectedLevel, selectedSchool,selectedCastingTime, 
        selectedDuration, selectedRange, selectedComponents, searchName]);

    // Calculate paginated subset of spells
    const paginatedSpells = useMemo(() => {
        const startIndex = (page - 1) * spellsPerPage;
        return filteredSpells.slice(startIndex, startIndex + spellsPerPage);
    }, [filteredSpells, page, spellsPerPage]);

    // Calculate total number of pages
    const totalPages = useMemo(() => {
        return Math.ceil(filteredSpells.length / spellsPerPage);
    }, [filteredSpells, spellsPerPage]);

    return (
        <div className="spell-list-container">
            {/* Filter Section */}
            <div className={`filter-section flex flex-row items-start justify-start flex-wrap ${collapsed ? 'gap-2 px-2 py-1 text-sm' : 'gap-4 px-4 py-2'}`}>
                <label>
                    Filter by Class: 
                    <select onChange={(e) => setSelectedClass(e.target.value || '')} className="border-2 border-gray-300 rounded-md p-1 mx-1">
                        <option value="">All</option>
                        <option value="cleric">Cleric</option>
                        <option value="druid">Druid</option>
                        <option value="paladin">Paladin</option>
                        <option value="wizard">Wizard</option>
                    </select>
                </label>
                <label>
                    Filter by Level: 
                    <select onChange={(e) => setSelectedLevel(e.target.value ? parseInt(e.target.value) : -1)} className="border-2 border-gray-300 rounded-md p-1 mx-1"> 
                        <option value={-1}>All</option>
                        <option value={0}>Cantrip</option>
                        <option value={1}>I</option>
                        <option value={2}>II</option>
                        <option value={3}>III</option>
                        <option value={4}>IV</option>
                        <option value={5}>V</option>
                        <option value={6}>VI</option>
                        <option value={7}>VII</option>
                        <option value={8}>VIII</option>
                        <option value={9}>IX</option>
                    </select>
                </label>
                <label>
                    Filter by School: 
                    <select onChange={(e) => setSelectedSchool(e.target.value || '')} className="border-2 border-gray-300 rounded-md p-1 mx-1">
                        <option value="">All</option>
                        <option value="Abjuration">Abjuration</option>
                        <option value="Conjuration">Conjuration</option>
                        <option value="Divination">Divination</option>
                        <option value="Enchantment">Enchantment</option>
                        <option value="Evocation">Evocation</option>
                        <option value="Illusion">Illusion</option>
                        <option value="Necromancy">Necromancy</option>
                        <option value="Transmutation">Transmutation</option>
                    </select>
                </label>
                <label>
                    Filter by Casting Time: 
                    <select onChange={(e) => setSelectedCastingTime(e.target.value || '') } className="border-2 border-gray-300 rounded-md p-1 mx-1">
                        <option value="">All</option>
                        <option value="1 action">1 Action</option>
                        <option value="1 bonus action">1 Bonus Action</option>
                        <option value="1 reaction">1 Reaction</option>
                        <option value="1 minute">1 Minute</option>
                        <option value="10 minutes">10 Minutes</option>
                        <option value="1 hour">1 Hour</option>
                        <option value="8 hours">8 Hours</option>
                        <option value="24 hours">24 Hours</option>
                    </select>
                </label>
                <label>
                    Filter by Duration: 
                    <select onChange={(e) => setSelectedDuration(e.target.value || '')} className="border-2 border-gray-300 rounded-md p-1 mx-1">
                        <option value="">All</option>
                        <option value="Instantaneous">Instantaneous</option>
                        <option value="1 minute">1 Minute</option>
                        <option value="10 minutes">10 Minutes</option>
                        <option value="Up to 1 hour">Up to 1 Hour</option>
                        <option value="1 hour">1 Hour</option>
                        <option value="8 hours">8 Hours</option>
                        <option value="24 hours">24 Hours</option>
                    </select>
                </label>
                <label>
                    Filter by Range: 
                    <select onChange={(e) => setSelectedRange(e.target.value || '')} className="border-2 border-gray-300 rounded-md p-1 mx-1">
                        <option value="">All</option>
                        <option value="Touch">Touch</option>
                        <option value="Self">Self</option>
                        <option value="10 feet">10 Feet</option>
                        <option value="30 feet">30 Feet</option>
                        <option value="60 feet">60 Feet</option>
                        <option value="90 feet">90 Feet</option>
                        <option value="120 feet">120 Feet</option>
                        <option value="150 feet">150 Feet</option>

                    </select>
                </label>
                <label>
                    Filter by Component: 
                    <select onChange={(e) => setSelectedComponents(e.target.value || '' )} className="border-2 border-gray-300 rounded-md p-1 mx-1">
                        <option value="">All</option>
                        <option value="V">V</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="V, M">V, M</option>
                        <option value="V, S">V, S</option>
                        <option value="S, M">S, M</option>
                        <option value="V, S, M">V, S, M</option>
                    </select>
                </label>
                <label>
                    Search by Name: 
                    <input type="text" value={searchName} 
                    onChange={(e) => setSearchName(e.target.value || '')}
                    placeholder="Enter spell name"
                    className="border-2 border-gray-300 rounded-md p-1 mx-1"/>
                </label>
            </div>
            {loading ? (
                <div className="flex text-red-950 items-center justify-center h-screen w-screen font-bold text-3xl">
                    <span className="loading-animation"></span>
                    <style>{`
                        .loading-animation::after {
                            content: 'Loading...';
                            animation: loading 2.5s steps(11, end) infinite;
                        }
                        @keyframes loading {
                            0%, 5% { content: ''; }
                            10% { content: 'L'; }
                            20% { content: 'Lo'; }
                            30% { content: 'Loa'; }
                            40% { content: 'Load'; }
                            50% { content: 'Loadi';}
                            60% { content: 'Loadin';}
                            70% { content: 'Loading';}
                            80% { content: 'Loading.';}
                            90% { content: 'Loading..';}
                            95%, 100% { content: 'Loading...';}
                        }
                    `}</style></div>
            ) : (
                <>
                    <div className="flex flex-wrap justify-center">
                        {paginatedSpells.map(spell => (
                            <SpellCard 
                                key={spell.id} 
                                spell={spell}
                                collapsed={collapsed}
                                onClick={() => onSpellSelect?.(spell)}
                                selected={selectedSpell?.id === spell.id}
                            />
                        ))}
                    </div>
                    <div>
                        <button onClick={() => {
                            setPage(p => p - 1);
                            window.scrollTo(0, 0);}} 
                            disabled={page === 1}
                            className="bg-red-950 text-white px-4 py-2 rounded-xl m-5 cursor-pointer">Previous </button>
                        <span className="text-black px-2 py-2"> Page {page} of {totalPages} </span>
                        <button onClick={() => {
                            setPage(p => p + 1);
                            window.scrollTo(0, 0);}} 
                            disabled={page === totalPages}
                            className="bg-red-950 text-white px-4 py-2 rounded-xl m-5 cursor-pointer">Next </button>
                    </div>
                </>
            )}
        </div>
    );
};