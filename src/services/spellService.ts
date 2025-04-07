import { Spell } from '../interfaces/types';
/* eslint-disable */

const BASE_URL = "https://dnd5eapi.co/api";

interface ApiSpellList {
    count: number,
    results: {
        index: string,
        name: string,
        url: string;
    }[];
}

interface SpellResponse {
    spells: Spell[];
    total: number;
}

const transformApiSpell = (apiSpell: any): Spell => {
    return {
        id: apiSpell.index,
        name: apiSpell.name,
        level: apiSpell.level,
        school: apiSpell.school.name,
        castingTime: apiSpell.casting_time,
        range: apiSpell.range,
        components: apiSpell.components,
        duration: apiSpell.duration,
        description: apiSpell.desc[0],
        atHigherLevels: apiSpell.higher_level,
        classes: apiSpell.classes.map((cls: any) => cls.index),
        subclasses: apiSpell.subclasses.map((cls: any) => cls.index)
    }
}

export const getAllSpells = async (): Promise<SpellResponse> => {
    const response = await fetch(`${BASE_URL}/spells`);
    const data: ApiSpellList = await response.json();

    const spellPromises = data.results.map( async (spell) => {
        const detailResponse = await fetch(`${BASE_URL}/spells/${spell.index}`);
        const spellData = await detailResponse.json();
        return transformApiSpell(spellData);
    });

    const spells = await Promise.all(spellPromises);

    return {
        spells,
        total: data.count
    };
}

export const getSpellByIndex = async (index: string): Promise<Spell> => {
    const response = await fetch(`${BASE_URL}/spells/${index}`);
    const data = await response.json();
    return transformApiSpell(data)
}