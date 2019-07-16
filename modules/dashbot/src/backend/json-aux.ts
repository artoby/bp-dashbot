export default function jsonIncludes(big: any, small: any): boolean {
    var bigType = typeof big
    var smallType = typeof small
    if (bigType !== smallType) {
        return false
    } else if (smallType === 'object') {
        const smallKeys = Object.keys(small)
        for (let i = 0; i < smallKeys.length; i++) {
            const itKey = smallKeys[i]
            if (big.hasOwnProperty[itKey] === false) {
                return false
            } else {
                let itIncludes = jsonIncludes(big[itKey], small[itKey])
                if (itIncludes === false) {
                    return false
                }
            }
        }
        return true
    } else if (Array.isArray(small)) {
        if (big.length < small.length) {
            return false
        }
        else {
            for (let i = 0; i < small.length; i++) {
                let itIncludes = jsonIncludes(big[i], small[i])
                if (itIncludes === false) {
                    return false
                }
            }
            return true
        }
    } else {
        return big == small
    }   
}