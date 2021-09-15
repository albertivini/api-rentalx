import fs from "fs";

export const deleteFile = async (filename: string): Promise<void> => {
    try {
        // ve se o arquivo existe na url q foi passada
        await fs.promises.stat(filename);
    } catch (err) {
        // eslint-disable-next-line no-useless-return
        return;
    }

    // apaga o arquivo
    await fs.promises.unlink(filename);
};
