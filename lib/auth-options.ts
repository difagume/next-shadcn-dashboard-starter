import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? "",
			clientSecret: process.env.GITHUB_SECRET ?? "",
		}),
		CredentialProvider({
			credentials: {
				email: {
					label: "email",
					type: "email",
					placeholder: "example@gmail.com",
				},
			},
			async authorize(credentials, req) {
				const user = { id: "1", name: "John", email: credentials?.email };
				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				}
				// If you return null then an error will be displayed advising the user to check their details.
				return null;
			},
		}),
	],
	pages: {
		signIn: "/", //sigin page
	},
};
