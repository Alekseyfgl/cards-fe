// =========API==========
import { buttonRowConst } from './utils/constans/button-row.const';

export interface IPack {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    deckCover: string;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
}

export interface IPacks {
    cardPacks: IPack[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
}


interface IPackQuery {
    page: string;
    pageCount: string;
    sortPacks: string;
    packName: string;
    user_id: string;
    min: string;
    max: string;
}

export type PackQueryTypes = Partial<Record<keyof IPackQuery, string>>;

// ============DOMAIN============
export interface PacksRow {
    _id: string;
    name: string;
    cards: number;
    updated: string;
    created: string;
    actions: typeof buttonRowConst;
}

export type PackSortTypes = 'name' | 'cardsCount' | 'updated' | 'created' | 'actions';
export type SortTypes = '0' | '1';

export type PackSortRequestTypes =
    `${SortTypes}name`
    | `${SortTypes}cardsCount`
    | `${SortTypes}updated`
    | `${SortTypes}created`
    | `${SortTypes}actions`;
