import { createCA, type CertificateAuthorityOptions } from "mkcert";

export const POST = async (event) => {

	const session = await event.locals.auth()

	if (!session) {
		return new Response(null, {
			status: 401, statusText: "Unauthorized"
		})
	}


	const { organization, countryCode, state, locality, validity }: CertificateAuthorityOptions = await event.request.json()


	const ca = await createCA({
		organization: "Hello CA",
		countryCode: "NP",
		state: "Bagmati",
		locality: "Kathmandu",
		validity: 365
	});


	return Response.json({})
}