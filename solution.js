
const isSpliceJoin = (s, l, v) => {
    if (s.length !== v.length) return false;

    const getSpliceJoinStrings = (str, length) => {
        const spliceJoinStrings = [];

        for (let i = 0; i < str.length; i += length) {
          spliceJoinStrings.push(str.substring(i, i + length));
        }

        return spliceJoinStrings;
    }

    const spliceStrings = getSpliceJoinStrings(s, parseInt(l));

    const getSpliceJoinPermutationStrings = (spliceJoinStrings, start, lastStr) => {
        const stringPermutation = [];

        const permute = (arr, memo = []) => {
            let cur;

            for (let i = 0; i < arr.length; i++) {
                if (memo.length === 0 && (arr[i] !== start && arr[i] !== lastStr)) continue;

                cur = arr.splice(i, 1);
                if (arr.length === 0) {
                  stringPermutation.push(memo.concat(cur));
                }
                permute(arr, memo.concat(cur));
                arr.splice(i, 0, cur[0]);
            }

            return stringPermutation;
        }

       return permute(spliceJoinStrings).map(str => str.join(''));
    }

    const permutatedSpliceJoinStrings = getSpliceJoinPermutationStrings(spliceStrings, v.substring(0, l), spliceStrings[spliceStrings.length - 1]);

    return permutatedSpliceJoinStrings.indexOf(v) !== -1;
}

const args = process.argv.slice(2);

console.log(isSpliceJoin(args[0], args[1], args[2]));