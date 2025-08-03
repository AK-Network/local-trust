import { redirect } from '@sveltejs/kit'

export const load = async ({locals, fetch}) => {
	const session = await locals.auth()

	if(!session) { throw redirect(307, `/`) }





	

	return {
		session,

		getCertificates: fetch('/api/certificates', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(res => res.json()),
	}
}