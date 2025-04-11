## SpellList
The groundwork for a D&D SpellDeck building web app built w/ React + TS + Vite

## Setup:
1. cd to project directory `cd spellList`
2. run `npm install` to install dependencies
3. run `npm run dev` to start development server; likely on http://localhost:5173/ if no other port is being used.
4. Check `package.json` for specific versions if you run into any dependency issues.    
**Note:** This project uses tailwindcss@3 – it should install w/ `npm install`, but just in case it doesn't: `npm install tailwindcss@3 postcss autoprefixer`

## INTERFACES (`types.ts`):
### Spell:
- id: number; (unique spell ID)
- name: string; (spell name)
- school: string; (school: evocation, illusion, etc.)
- castingTime: string; (action, bonus action, reaction, etc.)
- range: string; (60ft, 120ft, etc)
- components: string[]; (**Verbal**: V, **Somatic**: S, **Material**: M)
- duration: string; (Concentration, Instantaneous, etc.)
- level: number; (Cantrip, I, II, etc.)
- description: string; (Description of spell effect)
- atHigherLevels?: string; (Description of how spell's effect changes when used as a higher level spell)
- classes: string[]; (String array of classes which organically are able to choose this spell from their spell list upon leveling up)
- subclasses: string[]; (String array of subclasses which organically are able to choose this spell from their spell list upon leveling up)

### Character (UNUSED atm):
- id: number; (unique character ID)
- name: string; (Character name)
- class: string; (Character's class)
- subclass?: string; (Character's optional subclass)
- race: string; (Character's race)
- subrace?: string; (Character's subrace)
- level: number; (Character's level)
- spellcastingAbility: 'INT' | 'WIS' | 'CHA' (Ability which character uses to spellcast)
- spells: Spell[]; (Spell type array for Character's learned spells)

## SERVICES:
`spellService.ts`
- getAllSpells(): Promise<SpellResponse> - Fetches all spells from the D&D 5e API, transforms them to match interface, and returns them along with a count
- getSpellByIndex(index: string): Promise<Spell> - Fetches a single spell by its index from the D&D 5e API and transforms it to match interface
- Uses the D&D 5e API (https://dnd5eapi.co/api) as the data source
- Transforms API data to match application's Spell interface

## COMPONENTS:

### SpellCard – 
- Displays a single spell's details in a styled card format
- Shows spell name, level, school, casting time, range, components, duration, and description
- Conditionally shows "At Higher Levels" section if applicable
- Styled with Tailwind CSS with a D&D-themed design

### SpellList –
- Main component for displaying and filtering spells
- Fetches all spells on mount using spellService
- Provides filtering by spell class, level, school, casting time, range, duration, component(s), and name
- Implements pagination for browsing through the spell list
- Displays SpellCards for each spell in the current page

### Navbar –
- Navigation bar component with D&D Spell Decks
- Contains links to home page and "My Spell Decks" page (NOT BUILT)
- Responsive design with mobile support
- Styled with Tailwind CSS

### FUTURE DEVELOPMENT:
- Implement user authentication for saving custom spell decks
- Add character management functionality
- Create custom spell deck builder interface
- Add favorite/bookmark functionality for frequently used spells