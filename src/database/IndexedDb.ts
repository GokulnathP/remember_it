import {IndexedDBConnection} from "./IndexedDBConnection";
import {IndexedDBUpgradeConnection} from "./IndexedDBUpgradeConnection";

export default class IndexedDB {

    static connect(
        name: string,
        version: number = 1,
        upgrade: (connection: IndexedDBUpgradeConnection) => Promise<void> = async () => {}
    ): Promise<IndexedDBConnection> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(name, 1);

            request.onupgradeneeded = () => {
                upgrade(new IndexedDBUpgradeConnection(request.result))
                    .then(() => resolve(new IndexedDBConnection(request.result)))
                    .catch(reject);
            }

            request.onsuccess = () => {
                resolve(new IndexedDBConnection(request.result));
            }

            request.onerror = () => {
                reject(request.error);
            }
        });
    }

}
