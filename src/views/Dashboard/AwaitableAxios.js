import axios from 'axios'

class AwaitableAxios extends axios { }

const METHODS = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch']

METHODS.forEach(method => {
    AwaitableAxios[method] = (...args) => {
        return new Promise(
            resolve => {
                axios[method](...args)
                    .then((...args) => resolve(...args))
                    .catch((...args) => resolve(...args))
            }
        )
    }
})

export default AwaitableAxios
