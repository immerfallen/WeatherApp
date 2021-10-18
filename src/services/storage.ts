const storage = window.localStorage

export function set(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            storage && storage.setItem(key, JSON.stringify(value))
            resolve()
        } catch (err) {
            reject(`Coludnt store object ${err}`)
        }
    })
}

export function remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            storage && storage.remove(key)
            resolve()
        } catch (err) {
            reject(`Coludnt remove object ${err}`)
        }
    })
}

export function get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            if (storage) {
                const item = storage.getItem(key)
                resolve(JSON.parse(item))
            }
            resolve(undefined)
        }         
     catch (err) {
        reject(`Coludnt get object ${err}`)
    }
})
}