export const formatCurrency = (amt: number, showDecimals: boolean): string => {
    return `$${(amt / 100).toFixed(showDecimals ? 2 : 0)}`;
}

export const unslugify = (slug: string): string => {
    return slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
}