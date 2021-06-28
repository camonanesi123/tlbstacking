export const NF = (num,p=2) => Number(num).toFixed(p).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
