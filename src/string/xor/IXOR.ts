export interface IXOR {
    encrypt(src: string, pwd: string): string | null;
    decrypt(data: string, pwd: string): string | null;
}