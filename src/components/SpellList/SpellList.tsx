import { useState, useEffect, useMemo } from 'react';
import { Spell } from '../../interfaces/types'
import { SpellCard } from '../SpellCard/SpellCard';
import { getAllSpells } from '../../services/spellService';

export const SpellList = () => {
    const [spells, setSpells] = useState<Spell[]>([]);
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedLevel, setSelectedLevel] = useState<number>(-1);
    const [loading, setLoading] = useState(true);
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

    const filteredSpells = useMemo(() => {
        let result = [...spells];

        if (selectedClass) {
            result = result.filter(spell => spell.classes.includes(selectedClass));
        }

        if (selectedLevel !== null) {
            result = result.filter(spell => spell.level >= selectedLevel);
        }
        return result;
    }, [spells, selectedClass, selectedLevel]);

    const paginatedSpells = useMemo(() => {
        const startIndex = (page - 1) * spellsPerPage;
        return filteredSpells.slice(startIndex, startIndex + spellsPerPage);
    }, [filteredSpells, page, spellsPerPage]);

    const totalPages = useMemo(() => {
        return Math.ceil(filteredSpells.length / spellsPerPage);
    }, [filteredSpells, spellsPerPage]);

    return (
        <div className="spell-list-container">

            <div className="filter-section flex flex-row items-start justify-start gap-4 px-4 py-2">
                <label>
                    Filter by Class:
                    <select onChange={(e) => setSelectedClass(e.target.value || '')}>
                        <option value="">All</option>
                        <option value="cleric">Cleric</option>
                        <option value="druid">Druid</option>
                        <option value="paladin">Paladin</option>
                        <option value="wizard">Wizard</option>
                    </select>
                </label>
                <label>
                    Filter by Level:
                    <select onChange={(e) => setSelectedLevel(e.target.value ? parseInt(e.target.value) : -1)}> 
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
            </div>
            {loading ? (
                <div className="flex text-red-950 items-center justify-center h-screen w-screen font-bold text-2xl">Loading spells...</div>
            ) : (
                <>
                    <div className="flex flex-wrap justify-center">
                        {paginatedSpells.map(spell => (
                            <SpellCard key={spell.id} spell={spell} />
                        ))}
                        </div>
                        <div className="pagination">
                            <button onClick={() => setPage(p => p - 1)} disabled={page === 1}
                                className="bg-red-950 text-white px-4 py-2 rounded-xl m-5"> 
                                Previous </button>
                            <span className="text-black px-2 py-2">Page {page} of {totalPages}</span>
                            <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}
                                className="bg-red-950 text-white px-4 py-2 rounded-xl m-5"> Next </button>
                        </div>
                </>
            )}
            </div>
    );
};