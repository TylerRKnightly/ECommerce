export const formatCurrency = (amt: number, showDecimals:boolean):string => {
    return `$${(amt/100).toFixed(showDecimals ? 2 : 0)}`;
}