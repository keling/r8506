module.exports.numberFormat = function (obj) {
    if (isNaN(obj)) {
        return obj
    }

    return obj.toLocaleString()
}
