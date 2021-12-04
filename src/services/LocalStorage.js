// type Storage = {
//     write(data: unknown): Promise<void>;
//     read(): Promise<void>;
// };

// class LocalStorageStorage implements Storage {
//     async write(data: unknown) {
//         try {
//             const string = JSON.stringify(data);

//             localStorage.setItem("store", string);
//         } catch (error) {
//             throw new Error("Can't write data");
//         }
//     }

//     async read() {}
// }

// class StorageService {
//     private storage: Storage;

//     constructor(storage: Storage) {
//         this.storage = storage;
//     }

//     write(data) {
//         this.storage.write(data);
//     }
// }

// export default StorageService;
