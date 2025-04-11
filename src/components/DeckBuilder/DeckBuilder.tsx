/* eslint-disable */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams to get the id of the deck, useNavigate to navigate to the deck
import { Character, Spell, SpellDeck } from "../../interfaces/types";
import { useDecks } from "../../hooks/useDecks";
import { SpellCard } from "../SpellCard/SpellCard";
import { SpellList } from "../SpellList/SpellList";

export const DeckBuilder = () => {
    const [spellDeck, setSpellDeck] = useState<SpellDeck | null>(null);

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string | undefined>("");
    const [spells, setSpells] = useState<Spell[]>([]);
    const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
    // const [character, setCharacter] = useState<Character | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [deckError, setDeckError] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const { decks, saveDeck, deleteDeck, addSpellToDeck, removeSpellFromDeck, clearDeck } = useDecks();

    const { deckId } = useParams<{ deckId: string }>();

    const navigate = useNavigate();

    useEffect(() => {
        if (deckId) {
            try {
            const deck = decks.find(d => d.id === deckId)
            setIsEditing(true);
            if (deck) {
                setSpellDeck(deck);
                setName(deck.name);
                // setCharacter(deck.character);
                setDescription(deck.description || "");
                setSpells(deck.spells);
            } 
        } catch (err) {
            setDeckError("Deck not found");
            console.error(err);
        }
    }
    }, [deckId, decks]);

    const handleSave = async () => {
        if (!name) {
            setDeckError("Name is required");
            return;
        }
        if (deckError) {
            setDeckError(null);
            return;
        }
        if (isEditing && spellDeck?.id) {
            const updatedDeck: SpellDeck = {
                id: spellDeck.id,
                name,
                spells,
                // character: spellDeck.character || null,
                description,
                createdAt: spellDeck.createdAt || Date.now(),
                updatedAt: spellDeck.updatedAt || Date.now()
            }

            try {

                saveDeck(updatedDeck);
                navigate(`/decks/${updatedDeck.id}`);

            } catch (err) {

                console.error(err);
                setDeckError("Failed to save deck");
            }

        } else { 
            const newDeck: SpellDeck = {
            id: "",
            name,
            spells,
            // character: null,
            description,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        try {
            const savedDeck = saveDeck(newDeck);
            navigate(`/decks/${savedDeck.id}`);
        } catch (err) {
            setDeckError("Failed to save deck");
            console.error(err);
        }
    }
};

const handleAddSpell = () => {
    if (selectedSpell) {
        if (!spellDeck) {
            // Create a new deck if one doesn't exist
            const newDeck: SpellDeck = {
                id: "",
                name: "New Deck",
                description: "",
                spells: [selectedSpell],
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
            const savedDeck = saveDeck(newDeck);
            setSpellDeck(savedDeck);
            setSpells([selectedSpell]);
        } else {
            const updatedDeck = addSpellToDeck(spellDeck.id, selectedSpell);
            if (updatedDeck) {
                setSpellDeck(updatedDeck);
                setSpells(updatedDeck.spells);
            }
        }
        setSelectedSpell(null);
    }
};

const handleRemoveSpell = () => {
    if (selectedSpell) {
        const updatedDeck = removeSpellFromDeck(spellDeck?.id || "", selectedSpell.id.toString());
        if (updatedDeck) {
            setSpellDeck(updatedDeck);
            setSelectedSpell(null);
            saveDeck(updatedDeck);
            setSpells(updatedDeck.spells);
            if (!isEditing && !isCreating && updatedDeck.id) {
                navigate(`/decks/${updatedDeck.id}`);
            }
        }
    }
};

const handleClearDeck = () => {
    if (spellDeck?.id) {
        const updatedDeck = clearDeck(spellDeck.id);
        if (updatedDeck) {
            setSpellDeck(updatedDeck);
            if (!isEditing && !isCreating) {
                navigate(`/decks/${updatedDeck.id}`)
            }
        }
    }
};

const handleDeleteDeck = () => {
    if (spellDeck?.id) {
        deleteDeck(spellDeck.id);
        navigate("/decks");
    }
};

return (
    <div className="deck-builder-container m-4">
        <h1 className="text-2xl font-bold mb-4">Deck Builder</h1>
        {deckError && <div className="error-message text-red-600 font-bold">{deckError}</div>}
        {isCreating && <div className="creating-deck-message">Creating new deck...</div>}
        {isEditing && <div className="editing-deck-message">Editing deck</div>}
        <form onSubmit={handleSave} className="mb-4">
            <div className="form-group mb-4">
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Deck Name</label>
                <input 
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block p-2 w-full rounded-md border-gray-300 shadow-md focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                    placeholder="Enter deck name"
                    required
                />
            </div>
            <div className="form-group mb-4">
                <label htmlFor="description" className="block text-lg font-semibold text-gray-700">Description</label>
                <textarea
                    id="description"
                    value={description || ""}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block p-2 w-full rounded-md border-gray-300 shadow-md focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                    placeholder="Enter deck description"
                />
            </div>

            {/*<div className="form-group mb-4">
                <label htmlFor="character" className="block text-sm font-medium text-gray-700">Character</label>
                <select
                    id="character"
                        value={character ? character.id.toString() : ""}
                    onChange={(e) => setCharacter(e.target.value ? { id: parseInt(e.target.value) } as Character : null)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    // Set character options from character array once implemented
                />
            </div>*/}
            <div className="flex flex-row items-center justify-center gap-2 mb-4 font-bold text-gray-700">
            {name ? <div className="text-4xl  mb-4">{name}</div> : <div className="text-4xl  mb-4">New Deck</div>}
            </div>
            {/* Button group */}
            <div className="button-group flex gap-4">
                <div className="form-group mb-4">
                    <button 
                        type="button"
                        onClick={handleAddSpell}
                        className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    >
                        Add Spell
                    </button>
                </div>
                <div className="form-group mb-4">
                    <button 
                        type="button"
                        onClick={handleRemoveSpell}
                        className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        disabled={!selectedSpell}
                    >
                        Remove Spell
                    </button>
                </div>
                <div className="form-group mb-4">
                    <button 
                        type="button"
                        onClick={handleClearDeck}
                        className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    >
                        Clear Deck
                    </button>
                </div>
                <div className="form-group mb-4">
                    <button 
                        type="button"
                        onClick={handleDeleteDeck}
                        className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    >
                        Delete Deck
                    </button>
                </div>
                <div className="form-group mb-4">
                <button 
                    type="button"
                    onClick={handleSave}
                    className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >Save Deck
                </button> 
                </div>
            </div>
        </form>
        <div className="spell-selection-section">
            <details className="mb-4">
                <summary className="cursor-pointer text-2xl font-bold text-gray-700 p-2 bg-gray-100 rounded">
                    Available Spells
                </summary>
                <div className="mt-2 border rounded p-4">
                    <SpellList 
                        collapsed={true}
                        onSpellSelect={(spell) => {
                            setSelectedSpell(spell);
                        }}
                        selectedSpell={selectedSpell}
                    />
                </div>
            </details>

            {/* Show current deck spells */}
            <div className="current-deck-spells">
                <h3 className="text-2xl font-bold text-gray-700 mb-2">Current Deck Spells:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {spells.map(spell => (
                        <SpellCard 
                            key={spell.id}
                            spell={spell}
                            collapsed={true}
                            onClick={() => setSelectedSpell(spell)}
                            selected={selectedSpell?.id === spell.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
);
}
