module.exports.numberFormat = function (obj) {
    if (isNaN(obj)) {
        return ``
    }

    return obj.toLocaleString()
}
