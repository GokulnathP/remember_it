export class IndexedDBConnection {
    readonly name;
    readonly version;
    readonly objectStoreNames;

    constructor(protected connection: IDBDatabase) {
        this.name = connection.name;
        this.version = connection.version;
        this.objectStoreNames = connection.objectStoreNames;
    }

    readAll<Entity>(storeName: string): Promise<Entity[]> {
        return new Promise((resolve, reject) => {
            const request = this.connection
                .transaction(storeName, "readonly")
                .objectStore(storeName)
                .getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            }
        });
    }

    read<Entity>(storeName: string, id: IDBValidKey): Promise<Entity> {
        return new Promise((resolve, reject) => {
            const request = this.connection.transaction(storeName, "readonly").objectStore(storeName).get(id);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            }
        });
    }

    write(storeName: string, data: object): Promise<IDBValidKey> {
        return new Promise((resolve, reject) => {
            const request = this.connection.transaction(storeName, "readwrite").objectStore(storeName).put(data);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            }
        });
    }

    remove(storeName: string, id: IDBValidKey): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = this.connection.transaction(storeName, "readwrite").objectStore(storeName).delete(id);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            }
        });
    }

}