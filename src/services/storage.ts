const storage = window.localStorage

export function set(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject)=> {
        try{
            storage && storage.setItem(key, JSON.stringify(value))
            resolve()
        } catch (err){
            reject(`Coludnt store object ${err}`)
        }
    })
}