import { dev } from '$app/environment'
import clientPromise from '$lib/mongodb'
import { createCA, createCert } from 'mkcert'
import { Collection } from 'mongodb'


export const GET = async (event) => {

	const session = await event.locals.auth()

	if (!session?.user) return Response.redirect('/', 401)

	performance.addEventListener('resourcetimingbufferfull', (ev) => {
		console.log('performance resourcetimingbufferfull')
	}, {})


	const startMark = performance.mark('start db query')



	const client = await clientPromise
	const db = client.db("localTrust")

	const certificates = await db.collection('certificates').find({
		userId: session.user.id
	}, { serializeFunctions: true }).toArray()




	const measure = performance.measure('db query', startMark)
	console.log(`${measure.name} took', ${measure.duration}ms`)




	return Response.json({ data: { certificates } })
}



export const POST = async (event) => {

	const session = await event.locals.auth()

	if (!session?.user) return Response.redirect('/', 401)

	const client = await clientPromise
	const db = client.db("localTrust")

	try {
		const { type, ...rest }: { type: 'root' | 'child', [key: string]: any } = await event.request.json()

		if (type === 'root') {
			const { organization, countryCode, state, locality, validity } = rest


			const rootCertificate = await createCA({
				organization: organization ?? "Local Trust CA",
				countryCode: countryCode ?? "GR",
				state: state ?? "Attica",
				locality: locality ?? "Athens",
				validity: validity ?? 365
			});

			const startMark = performance.mark('start db query')


			const result = await db.collection('certificates').insertOne({
				type,
				userId: session.user.id,
				organization,
				countryCode,
				state,
				locality,
				validFor: validity,
				ssl: rootCertificate,
				createdAt: new Date(),
			}, { serializeFunctions: true })


			const measure = performance.measure('Create Root Certification Authority', startMark)
			console.log(`${measure.name} took', ${measure.duration}ms`)

			return Response.json({
				data: {
					type,
					ssl: rootCertificate
				},
				metadata: { measure, userId: session.user.id }
			},
				{ status: 201 })
		}

		if(type === 'child') {
			const { organization, email, domains, validity } = rest


			const startMark = performance.mark('start db query')
			const rootCA = await db.collection('certificates').findOne({
				userId: session.user.id,
				type: 'root'
			})

			if(!rootCA) throw new Error('No root certificate found for user')

			const projectCertificate = createCert({
				ca: {
					key: rootCA.ssl.key,
					cert: rootCA.ssl.cert
				},
				domains,
				validity,
				email,
				organization
			})


			const childProjectResult = await db.collection('certificates').insertOne({
				type,
				userId: session.user.id,
				organization,
				email,
				domains,
				validFor: validity,
				ssl: projectCertificate,
				createdAt: new Date(),
			}, { serializeFunctions: true })

			const measure = performance.measure('Create Prject Certificates', startMark)
			console.log(`${measure.name} took', ${measure.duration}ms`)

			return Response.json({
				data: {
					type,
					ssl: projectCertificate
				},
				metaData: {
					measure, userId: session.user.id
				}
			})
		}

	} catch (e: any) {
		return Response.json({ error: e.message }, { status: 400 })
	} finally {
		!dev && client.close()
	}
}