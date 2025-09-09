import { certManager } from '$lib/store.svelte.js'

export const load = async (event) => {
  const session = await event.locals.auth()

	console.log(session)
	session && await certManager.getCertificates(event, true)

  return {
    session,
		rootCA: certManager.rootCA,
		projects: certManager.projects,
  }
}