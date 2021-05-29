export interface IEmployee {
	id: number | string,
	email?: string,
	picture?: Picture,
	name?: Name,
};

export type Name = {
	title?: string,
	first?: string,
	last?: string,
};

export type Picture = {
	large?: string,
	medium?: string,
	thumbnail?: string,
};
