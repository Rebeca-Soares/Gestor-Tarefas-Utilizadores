export enum TagType {
    WORK = 'Trabalho',
    PERSONAL = 'Pessoal',
    STUDY = 'Estudo'
}

export interface ITag {
    id: number;
    name: string;
    color: string;
}