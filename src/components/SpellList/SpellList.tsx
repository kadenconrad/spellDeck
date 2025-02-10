import { useState, useEffect } from 'react';
import { Spell } from '../../interfaces/types'
import { SpellCard } from '../SpellCard/SpellCard';
import { getSpells } from '../../services/spellService';
import './SpellList.css';

export const SpellList = () => {
    const [spells, setSpells] = useState<Spell[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalSpells, setTotalSpells] = useState(0);
    const spellsPerPage = 8;

    useEffect(() => {
        const loadSpells = async () => {
            setLoading(true);
            try {
                const { spells: newSpells, total } = await getSpells(page, spellsPerPage);
                setSpells(newSpells);
                setTotalSpells(total);
            } catch (error) {
                console.error('Error loading spells:', error);
            } finally {
                setLoading(false);
            }
        };

        loadSpells();
    }, [page]);

    const totalPages = Math.ceil(totalSpells / spellsPerPage);

    return (
        <div className="spell-list-container">
            {loading ? (
                <div className="loading">Loading spells...</div>
            ) : (
                <>
                    <div className="spell-list">
                        {spells.map(spell => (
                            <SpellCard key={spell.id} spell={spell} />
                        ))}
                        </div>
                        <div className="pagination">
                            <button
                                onClick={() => setPage(p => p - 1)}
                                disabled={page === 1}
                                >
                                    Previous
                            </button>
                            <span>Page {page} of {totalPages}</span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page === totalPages}
                                > 
                                    Next
                                </button>
                            </div>
                            </>
            )}
            </div>
    );
};