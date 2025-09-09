import clientPromise from '$lib/mongodb'
import { error, json, text } from '@sveltejs/kit'
import { config } from '$lib'

const { db: dbConfig} = config

export const GET = async (event) => {

	const session = await event.locals.auth()

	if(!session?.user) return error(401, 'Unauthorized')
		
	const {name, collections: {certificates}} = dbConfig


	const client = await clientPromise
	const db = client.db(name)

	const certificate = await db.collection(certificates).findOne({ type: 'root', userId: session.user.id })

	if(!certificate) return error(404, 'Root CA not found')


	const filename = certificate.options.organization.replace(/[^a-zA-Z0-9]/g, '_')
	const fileBuffer = new TextEncoder().encode(certificate.ca.cert)

	return new Response(fileBuffer, {
    headers: {
      'Content-Type': 'application/x-x509-ca-cert', // 'application/pkix-cert' || 'application/x-x509-ca-cert'
      'Content-Disposition': `attachment; filename="${filename}.crt"`,
			'Content-Length': fileBuffer.byteLength.toString()
    },
  });
}