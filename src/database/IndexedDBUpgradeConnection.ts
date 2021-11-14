import {IndexedDBConnection} from "./IndexedDBConnection";

export class IndexedDBUpgradeConnection extends IndexedDBConnection {

    constructor(connection: IDBDatabase) {
        super(connection);
    }

    createObjectStore(name: string, options?: IDBObjectStoreParameters): Promise<IDBObjectStore> {
        return new Promise((resolve, reject) => {
            const request = this.connection.createObjectStore(name, options);

            request.transaction.oncomplete = () => {
                resolve(request);
            }

            request.transaction.onerror = () => {
                reject(request.transaction.error);
            }
        });
    }

    deleteObjectStore(name: string): void {
        this.connection.deleteObjectStore(name);
    }

}