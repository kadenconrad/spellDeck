/* eslint-disable */
import { useState, useEffect } from 'react';
import { Spell } from '../../interfaces/types';
import './SpellCard.css'

interface SpellCardProps {
    spell: Spell;
    // add more, like onSelect
}

export const SpellCard = ({ spell }: SpellCardProps) => {

    const [higherLevels, setHigherLevels] = useState(false);
    const [isCantrip, setIsCantrip] = useState<boolean>(false);

    useEffect(() => {
        setHigherLevels(!!(spell.atHigherLevels && spell.atHigherLevels.length > 0))
    }, [spell.atHigherLevels]);

    useEffect(() => {
        setIsCantrip(!!(spell.level === 0))}, 
        [spell.level]
    )

    return (
        <div className="spell-card border-4 border-red-950 text-black rounded-lg p-4 m-5 shadow-md bg-amber-100 max-w-md overflow-hidden">
            {/* Spell Card Header */}
            <div className="spell-header uppercase font-bold text-red-950 p-1 text-xl border-b-2 border-red-900">
                <h3>{spell.name}</h3>
                <p className="spell-meta text-base font-semibold normal-case flex gap-1.5  text-red-950/90">
                    <span>{isCantrip ? "Cantrip" : "Level " + spell.level }</span> <span className='text-red-950/60'> {spell.school} </span>
                </p>
            </div>
            {/* Spell Details */}

            <div className="spell-details border-b-2 border-red-900/25 p-1 text-red-950 flex gap-2">
                <div>
                    <p className='pr-1 pt-0.5 pb-1'><span className='text-nowrap font-semibold'>Casting Time:</span> {spell.castingTime}</p>
                    <p className='pr-1 pb-0.5'><span className='text-nowrap font-semibold'>Range:</span> {spell.range}</p>
                </div>
                <div>
                    <p className='pl-1 pt-0.5 pb-1'><span className='text-nowrap font-semibold'>Components:</span> {spell.components}</p>
                    <p className='pl-1 pb-0.5'><span className='text-nowrap font-semibold'>Duration:</span> {spell.duration}</p>
                </div>
            </div>

            {/* Spell Description */}
            <div className="spell-description p-1">
                <p><span className='text-red-950 font-semibold'>Description:</span> {spell.description}</p>
            </div>

            {/* At Higher Levels */}
            {higherLevels && (
                <div className="spell-higherLevels border-t-2 border-red-900/25 p-1">
                <p><span className='text-red-950 font-semibold'>Higher Levels:</span> {spell.atHigherLevels}</p>
            </div>
            )}
            
        </div>
    )
}