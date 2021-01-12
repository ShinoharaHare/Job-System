import { DAccount, DJob } from '../models';

declare global {
    namespace Express {
        interface Request {
            account?: DAccount | null;
            job?: DJob | null;
        }
    }
}
