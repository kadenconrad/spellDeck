import { useEffect, useState } from "react";
import { Spell, SpellDeck } from "../interfaces/types";
import * as deckService from "../services/deckService";

export const useDecks = () => {
    const [decks, setDecks] = useState<SpellDeck[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchDecks = () => {
            try {
                const loadedDecks = deckService.getDecks();
                setDecks(loadedDecks);
                setError(null);
            } catch (err) {
                setError('Failed to fetch decks');
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        fetchDecks();
    }, []);
    const saveDeck = (deck: SpellDeck): SpellDeck => {
        try {
            const updatedDeck = deckService.saveDeck(deck);
            if (updatedDeck) {
                setDecks(prevDecks => {
                    const existingIndex = prevDecks.findIndex(d => d.id === updatedDeck.id);
                    if (existingIndex >= 0) {
                        return prevDecks.map(d => d.id === updatedDeck.id ? updatedDeck : d);
                    } else {
                        return [...prevDecks, updatedDeck];
                    }
                });
                return updatedDeck;
            }
            else { 
                throw new Error('Failed to save deck') 
            }
        } catch (err) {
            setError('Failed to save deck');
            console.error(err);
            throw err;
        }
    }
    const deleteDeck = (deckId: string) => {
        try {
            const updatedDecks = deckService.deleteDeck(deckId);
            if (updatedDecks === true) {
                setDecks(prevDecks => prevDecks.filter(d => d.id !== deckId));
            }
            else { 
                throw new Error('Failed to delete deck') 
            }
        } catch (err) {
            setError('Failed to delete deck');
            console.error(err);
        }
    }
    const addSpellToDeck = (deckId: string, spell: Spell): SpellDeck | undefined => {
        try {
            const updatedDeck = deckService.addSpellToDeck(deckId, spell);
            if (updatedDeck !== undefined ) {
                setDecks(prevDecks => prevDecks.map(d => d.id === updatedDeck.id ? updatedDeck : d));
                return updatedDeck;
            }
            else { 
                throw new Error('Failed to add spell to deck') 
            }
        } catch (err) {
            setError('Failed to add spell to deck');
            console.error(err);
            return undefined;
        }
    }
    const removeSpellFromDeck = (deckId: string, spellId: string): SpellDeck | undefined => {
        try {
            const updatedDeck = deckService.removeSpellFromDeck(deckId, spellId);
            if (updatedDeck !== undefined) {
                setDecks(prevDecks => prevDecks.map(d => d.id === updatedDeck.id ? updatedDeck : d));
                return updatedDeck;
            }
            else { 
                throw new Error('Failed to remove spell from deck')
            };
        } catch (err) {
            setError('Failed to remove spell from deck');
            console.error(err);
            return undefined;
        }
    }
    const clearDeck = (deckId: string): SpellDeck | undefined => {
        try {
            const updatedDeck = deckService.clearDeck(deckId);
            if (updatedDeck !== undefined) {
                setDecks(prevDecks => prevDecks.map(d => d.id === updatedDeck.id ? updatedDeck : d));
                return updatedDeck;
            }
            else { 
                throw new Error('Failed to clear deck') 
            }
        } catch (err) {
            setError('Failed to clear deck');
            console.error(err);
            return undefined;
        }
    }
    return { decks, loading, error, saveDeck, deleteDeck, addSpellToDeck, removeSpellFromDeck, clearDeck};
}