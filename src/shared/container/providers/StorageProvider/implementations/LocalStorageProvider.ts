import fs from "fs";
import path from "path";

import upload from "../../../../../config/upload";
import { IStorageProvider } from "../IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(upload.tmpFolder),
            path.resolve(`${upload.tmpFolder}/${folder}`, file)
        );

        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        const filename = path.resolve(`${upload.tmpFolder}/${folder}`, file);

        try {
            // ve se o arquivo existe na url q foi passada
            await fs.promises.stat(filename);
        } catch (err) {
            // eslint-disable-next-line no-useless-return
            return;
        }

        // apaga o arquivo
        await fs.promises.unlink(filename);
    }
}
