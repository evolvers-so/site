import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../utils/mongodb";
import { CustomsendVerificationRequest } from "./signinemail"

export const authOptions = {
  providers: [
    EmailProvider({
      server: {
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: "hr@techoptimum.org",
          pass: process.env.PASSWORD,
        },
      },
      from: "hr@techoptimum.org",
      sendVerificationRequest({ identifier, url, provider }) {
        CustomsendVerificationRequest({ identifier, url, provider })
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  
};

export default NextAuth(authOptions);
