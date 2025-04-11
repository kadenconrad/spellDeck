import { useState, useEffect } from 'react';
import { Spell } from '../../interfaces/types';
import './SpellCard.css'

interface SpellCardProps {
    spell: Spell;
    onClick?: () => void;
    selected?: boolean;
    collapsed?: boolean;
}

export const SpellCard = ({ spell, onClick, selected, collapsed = false }: SpellCardProps) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    const [higherLevels, setHigherLevels] = useState(false);
    const [isCantrip, setIsCantrip] = useState<boolean>(false);

    useEffect(() => {
        setHigherLevels(!!(spell.atHigherLevels && spell.atHigherLevels.length > 0))
    }, [spell.atHigherLevels]);

    useEffect(() => {
        setIsCantrip(!!(spell.level === 0))
    }, [spell.level]);

    if (collapsed) {
        return (
            <div 
                className={`spell-card border-2 ${selected ? 'border-slate-950 bg-amber-150 hover:bg-gray-200' : 'border-red-950 bg-amber-100 hover:bg-gray-200'} text-black rounded-lg p-4 m-5 shadow-xl max-w-md overflow-hidden cursor-pointer`}
                onClick={handleClick}
            >
                <div className="spell-header uppercase font-semibold text-red-950 p-1 text-xl border-b-2 border-red-900">
                    <h3>{spell.name}</h3>
                    <p className="spell-meta text-base font-semibold normal-case flex gap-1.5 text-red-950/90">
                        <span>{isCantrip ? "Cantrip" : "Level " + spell.level }</span> <span className='text-red-950/60'> {spell.school} </span>
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div 
            className="spell-card border-2 border-red-950 text-black rounded-lg p-4 m-5 shadow-xl bg-amber-100 max-w-md overflow-hidden cursor-pointer hover:bg-gray-200" 
            onClick={handleClick}
        >
            <div className="spell-header uppercase font-semibold text-red-950 p-1 text-xl border-b-2 border-red-900">
                <h3>{spell.name}</h3>
                <p className="spell-meta text-base font-semibold normal-case flex gap-1.5  text-red-950/90">
                    <span>{isCantrip ? "Cantrip" : "Level " + spell.level }</span> <span className='text-red-950/60'> {spell.school} </span>
                </p>
            </div>

            <div className="spell-details border-b-2 border-red-900/25 p-1 text-red-950 flex gap-2">
                <div>
                    <p className='pr-1 pt-0.5 pb-1'><span className='text-nowrap font-semibold'>Casting Time:</span> {spell.castingTime}</p>
                    <p className='pr-1 pb-0.5'><span className='text-nowrap font-semibold'>Range:</span> {spell.range}</p>
                </div>
                <div>
                    <p className='pl-1 pt-0.5 pb-1'><span className='text-nowrap font-semibold'>Components:</span> {spell.components.join(', ')}</p>
                    <p className='pl-1 pb-0.5'><span className='text-nowrap font-semibold'>Duration:</span> {spell.duration}</p>
                </div>
            </div>

            <div className="spell-description p-1">
                <p><span className='text-red-950 font-semibold'>Description:</span> {spell.description}</p>
            </div>

            {higherLevels && (
                <div className="spell-higherLevels border-t-2 border-red-900/25 p-1">
                    <p><span className='text-red-950 font-semibold'>Higher Levels:</span> {spell.atHigherLevels}</p>
                </div>
            )}
        </div>
    )
}