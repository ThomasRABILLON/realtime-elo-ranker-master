export const winProbability = (rank1: number, rank2: number): number => {
    return parseFloat(
        (1 / (1 + Math.pow(10, (rank2 - rank1) / 400))).toFixed(2),
    );
};

export const newRank = (
    rank: number,
    k: number,
    result: number,
    expected: number,
): number => {
    const newRank = Math.round(rank + k * (result - expected));
    return newRank < 0 ? 0 : newRank;
};
