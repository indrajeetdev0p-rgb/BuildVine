import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      avatar: {
        type: "string",
        required: false
      },
      displayUsername: {
        type: "string",
        required: false
      }
    }
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github", "google"],
      requireLocalEmailVerified: false,
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user: any) => {
          if (!user.username) {
            const base = user.name ? user.name.toLowerCase().replace(/[^a-z0-9]/g, '') : user.email.split('@')[0].replace(/[^a-z0-9]/g, '');
            const random = Math.floor(1000 + Math.random() * 9000);
            return {
              data: {
                ...user,
                username: `${base}${random}`
              }
            };
          }
          return { data: user };
        }
      }
    }
  },
  plugins: [
    username()
  ]
});
