
function isSpliceJoin(s, l, v) {
    console.log(s,l,v)
    if (s.length !== v.length) return false;

    function getSpliceJoinStrings(str, length) {
        var spliceJoinStrings = [];

        for (var i = 0; i < str.length; i += length) {
            if (i+length >= str.length) {
                spliceJoinStrings.push(str.substring(i, str.length));
            }
            else {
                spliceJoinStrings.push(str.substring(i, i+length));
            }
        }

        return spliceJoinStrings;
    }

    var spliceStrings = getSpliceJoinStrings(s, parseInt(l));

    function getSpliceJoinPermutationStrings(spliceJoinStrings, start, lastStr) {
        var stringPermutation = [];

        function permute(arr, memo) {
            var cur, memo = memo || [];

            for (var i = 0; i < arr.length; i++) {
                if (memo.length === 0 && (arr[i] !== start && arr[i] !== lastStr)) continue;

                cur = arr.splice(i, 1);
                if (arr.length === 0) {
                  stringPermutation.push(memo.concat(cur));
                }
                permute(arr.slice(), memo.concat(cur));
                arr.splice(i, 0, cur[0]);
            }

            return stringPermutation;
        }

        var permutatedArr = permute(spliceJoinStrings);

        var permutatedStringArr = [];

        permutatedArr.forEach(function(strArr) {
            permutatedStringArr.push(strArr.join(''));
        });
       return permutatedStringArr;
    }

    var permutatedSpliceJoinStrings = getSpliceJoinPermutationStrings(spliceStrings, v.substring(0, l), spliceStrings[spliceStrings.length-1]);

    for (var i = 0; i < permutatedSpliceJoinStrings.length; i++) {
        if (permutatedSpliceJoinStrings[i].toLowerCase() === v.toLowerCase()) return true;
    }

    return false;
}

var args = process.argv.slice(2);
console.log(args)

console.log(isSpliceJoin(args[0], args[1], args[2]));
// console.log(isSpliceJoin("abacaaa", 2, "aaacaba"));