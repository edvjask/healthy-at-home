export const isNumberPositive = (str: string): boolean => {
    const num = Number(str);

    return Number.isInteger(num) && num > 0;
};

export const isNumberPositiveAndLessThanValue = (str: string, value: number = 100, allowZero: boolean = false): boolean => {
    const num = Number(str);

    return Number.isInteger(num) && (allowZero ? num >= 0 : num > 0) && num <= value;
}

export const isNumberNonNegative = (str: string): boolean => {
    const num = Number(str);

    return Number.isInteger(num) && num >= 0;
};

export const isNumberNoLessThan = (str: string, valueToCheck: number) => {
    const num = Number(str);

    return Number.isInteger(num) && num >= valueToCheck;
}

export const isNumberBetween = (str: string, lowerBound: number, upperBound: number) => {
    const num = Number(str);

    return Number.isInteger(num) && num <= upperBound && num >= lowerBound;
}

export const splitCamelCase = (val: string): string => {
    return val
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
};
