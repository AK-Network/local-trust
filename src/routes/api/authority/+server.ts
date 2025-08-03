import clientPromise from "$lib/mongodb.js";
import { createCA, type Certificate, type CertificateAuthorityOptions } from "mkcert";

export const POST = async (event) => {

	const session = await event.locals.auth()

	if (!session) {
		return new Response(null, {
			status: 401, statusText: "Unauthorized"
		})
	}


	const { organization, countryCode, state, locality, validity }: CertificateAuthorityOptions = await event.request.json()
	let ca: Certificate
	try {
		ca = await createCA({
			organization: organization ?? "Local Trust CA",
			countryCode: countryCode ?? "GR",
			state: state ?? "Attica",
			locality: locality ?? "Athens",
			validity: validity ?? 365
		});
	} catch (error: any) {
		console.log('Error creating CA')
		return Response.json({error: error.message ?? "Error creating CA"}, {status: 500})
	}

	const client = await clientPromise
	const db = client.db('localTrust')

	db.collection('certificaties').insertOne({
		root: true,
		certs: ca
	})


	return Response.json({})
}