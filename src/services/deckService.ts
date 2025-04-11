import { Spell, SpellDeck } from "../interfaces/types";
import { v4 as uuidv4 } from 'uuid';

export const getDecks = (): SpellDeck[] => {
    const decksJson = localStorage.getItem('spellDecks');
    return decksJson ? JSON.parse(decksJson) : [];
};

export const getDeckById = (id: string): SpellDeck | undefined => {
    const decks = getDecks();
    if (id) {
        return decks.find((deck) => deck.id === id);
    }
    return undefined;
};

export const saveDeck = (deck: SpellDeck): SpellDeck => {
    const decks = getDecks();
    const existingIndex = decks.findIndex((d) => d.id === deck.id);
    let updatedDeck: SpellDeck;

    if (!deck.name || deck.name.trim() === '') {
        throw new Error("Deck name cannot be empty");
    }
    if (existingIndex >= 0) {
        updatedDeck = {...deck, updatedAt: Date.now()};
        decks[existingIndex] = updatedDeck;
    } 
    else {
        updatedDeck = {...deck, id: uuidv4(), createdAt: Date.now(), updatedAt: Date.now()};
        decks.push(updatedDeck);
    }
    localStorage.setItem('spellDecks', JSON.stringify(decks));
    return updatedDeck;
};

export const deleteDeck = (id: string): boolean => {
    const decks = getDecks();
    const index = decks.findIndex((deck) => deck.id === id);

    if (index >= 0 ) { 
        decks.splice(index, 1);
        localStorage.setItem('spellDecks', JSON.stringify(decks));
        return true;
    }
    return false;
};

export const addSpellToDeck = (deckId: string, spell: Spell): SpellDeck | undefined => {
    const deck = getDeckById(deckId);
    if (deck) {
        if (deck.spells.find((s) => s.id === spell.id)) {
            console.log('Spell already in deck');
            return deck;
        }
        const updatedDeck = {...deck, spells: [...deck.spells, spell]};
        return saveDeck(updatedDeck);
    }
    return undefined;
};

export const removeSpellFromDeck = (deckId: string, spellId: string): SpellDeck | undefined => {
    const deck = getDeckById(deckId);
    if (deck) {
        console.log('Current spells:', deck.spells);
        const updatedDeck = {...deck, spells: deck.spells.filter((s) => s.id.toString() !== spellId)}
        console.log('Updated spells:', updatedDeck.spells);
        return saveDeck(updatedDeck);
    }
    else {
        throw new Error("Deck not found");
    }
};

export const clearDeck = (deckId: string): SpellDeck | undefined => {
    const deck = getDeckById(deckId);
    if (deck) {
        const updatedDeck = {...deck, spells: []};
        return saveDeck(updatedDeck)
    }
    return undefined;
};