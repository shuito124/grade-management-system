import { createAuthClient } from "better-auth/react";
import {
    inferAdditionalFields,
    usernameClient,
} from "better-auth/client/plugins";

import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
    plugins: [
        usernameClient({
            displayUsername: false,
        }),
        inferAdditionalFields<typeof auth>(),
    ],
});