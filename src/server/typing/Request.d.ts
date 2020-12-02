import { DAccount } from '../models';

declare global {
    namespace Express {
        interface Request {
            account?: DAccount | null;
        }
    }
}
