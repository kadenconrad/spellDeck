export interface Spell {
    id: number;
    name: string;
    school: string;
    castingTime: string;
    range: string;
    components: string[];
    duration: string;
    level: number;
    description: string;
    atHigherLevels?: string;
    // Meta data
    classes: string[],
    subclasses: string[]

}

export interface Character {
    id: number;
    name: string;
    class: string;
    subclass?: string;
    race: string;
    subrace?: string;
    level: number;
    spellcastingAbility: 'INT' | 'WIS' | 'CHA'
    spells: Spell[];
}