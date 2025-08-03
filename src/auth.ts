import { SvelteKitAuth, type User } from "@auth/sveltekit"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GitHub from "@auth/sveltekit/providers/github"
import clientPromise from "$lib/mongodb"

export const { handle } = SvelteKitAuth({
	events: {

	},
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
// 	callbacks: {
// 		session({ session, user }) {
//       session.user.role = user.role
//       return session
//     },
//   },
})
