export interface HeaderCell {
    field?: string|undefined;
    align?: "center"|"justify"|"left"|"right"|"inherit";
    title?: string|undefined;
    hasSortFunction?: boolean;
    sortActive?: boolean;
    direction?: "asc"|"desc"|undefined;
}