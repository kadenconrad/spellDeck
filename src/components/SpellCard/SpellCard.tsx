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

    useEffect(() => {
        setHigherLevels(!!(spell.atHigherLevels && spell.atHigherLevels.length > 0))
    }, [spell.atHigherLevels]);

    return (
        <div className="spell-card">
            {/* Spell Card Header */}
            <div className="spell-header">
                <h3>{spell.name}</h3>
                <p className="spell-meta">
                    Level {spell.level} {spell.school}
                </p>
            </div>
            {/* Spell Details */}

            <div className="spell-details">
                <p><strong>Casting Time:</strong> {spell.castingTime}</p>
                <p><strong>Range:</strong> {spell.range}</p>
                <p><strong>Components:</strong> {spell.components}</p>
                <p><strong>Duration:</strong> {spell.duration}</p>
            </div>

            {/* Spell Description */}
            <div className="spell-description">
                <p><strong>Description:</strong> {spell.description}</p>
            </div>

            {/* At Higher Levels */}
            {higherLevels && (
                <div className="spell-higherLevels">
                <p><strong>Higher Levels:</strong> {spell.atHigherLevels}</p>
            </div>
            )}
            
        </div>
    )
}