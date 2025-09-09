import { SvelteKitAuth, type DefaultSession, type User } from "@auth/sveltekit"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GitHub from "@auth/sveltekit/providers/github"
import clientPromise from "$lib/mongodb"

declare module "@auth/sveltekit" {
	interface Session {
		user: {
			id: string;
			role: string
			/**
			 * By default, TypeScript merges new interface properties and overwrites existing ones.
			 * In this case, the default session user properties will be overwritten,
			 * with the new ones defined above. To keep the default session user properties,
			 * you need to add them back into the newly declared interface.
			 */
		} & DefaultSession["user"]
	}
}

export const { handle } = SvelteKitAuth({
	trustHost: true,
	// adapter: MongoDBAdapter(clientPromise, {
	// 	databaseName: "localTrust"
	// }),
	providers: [GitHub({

		// profile: (profile, tokens) => {
		// 	tokens.access_token
		// 	tokens.token_type
		// 	return {
		// 		id: profile.id,
		// 		name: profile.name,
		// 		email: profile.email,
		// 		image: profile.avatar_url,
		// 		role: profile.role ?? 'user',
		// 	}
		// } 

	})],
	events: {
		signIn: async (message) => {
			message.user
			message.user.id

			message.account?.type
			message.account?.provider
			message.account?.providerAccountId

			message.account?.id_token

			return
		},
		session: async (message) => {
			message.session.expires
			message.token

			return
		}
	},
	callbacks: {
		session({ session, token, newSession, user, trigger }) {
			if (token) {
				session.user.id = token.sub as string,
					session.user.role = token.role as string ?? 'user'
			}
			return session
		},

		jwt({ isNewUser, user, token, account, profile, session, trigger }) {

			return token
		}
	},


})
