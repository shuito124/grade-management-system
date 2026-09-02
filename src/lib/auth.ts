import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { username } from "better-auth/plugins";

import { db } from "@/db";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),

    emailAndPassword: {
        enabled: true,
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                input: false,
            },
        },
    },

    plugins: [
        username({
            displayUsername: false,
            immutableUsername: true,
        }),
    ],
});