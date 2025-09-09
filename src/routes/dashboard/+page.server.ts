import { error, fail, redirect } from '@sveltejs/kit'
// import { createClient } from 'redis';
import { CASchema, config, ProjectSchema } from '$lib';
import { treeifyError, ZodError } from 'zod';
import type { Actions } from './$types.js'
import { createCA, createCert } from 'mkcert';
import clientPromise from '$lib/mongodb.js';

// const redis = await createClient().connect();

export const load = async ({ locals, fetch }) => {
	const session = await locals.auth()

	if (!session?.user) { throw redirect(307, `/`) }

	return {}
}



const daysToMilliseconds = (n: number) => n * 24 * 60 * 60 * 1000

export const actions: Actions = {
	createCA: async (event) => {
		const session = await event.locals.auth()
		if (!session?.user) { return error(401, 'Unauthenticated') }

		const input = Object.fromEntries(await event.request.formData())

		// const redisCertificates = await redis.get(`LocalTrust:${session?.user.id}/certificates`)

		let data: ReturnType<typeof CASchema.parse> | undefined
		try {
			data = CASchema.parse({ ...input, validity: Number(input.validity) })
			const ca = await createCA(data)

			const client = await clientPromise
			const { name, collections: { certificates } } = config.db

			const createdAt = new Date().getTime()
			await client.db(name).collection(certificates).insertOne({
				userId: session.user.id,
				type: 'root',
				ca,
				options: { ...data },
				createdAt,
				expiresAt: createdAt + daysToMilliseconds(data.validity),
			})

			redirect(303, `/dashboard`)

		} catch (error) {
			console.error(`Something went wrong trying to insert the new documents: ${error}\n`);
			if (error instanceof ZodError) {
				return fail(400, { ...data, ...treeifyError(error) })
			}
			return fail(400, { ...data, errors: [`Something went wrong trying to insert the new document: ${error}`] })
		}
	},


	createProject: async (event) => {
		const session = await event.locals.auth()
		if (!session?.user) { return error(401, 'Unauthenticated') }


		const formData = await event.request.formData()
		const input = Object.fromEntries(formData)

		let data: ReturnType<typeof ProjectSchema.parse> | undefined
		try {
			data = ProjectSchema.parse({
				...input,
				domains: (formData.getAll('domains') as string[]).filter(Boolean),
				validity: Number(input.validity) * 365
			})


			const { name, collections: { certificates} } = config.db
			const client = await clientPromise


			const doc = await client.db(name).collection(certificates).findOne({
				type: 'root',
				userId: session.user.id
			}, { projection: { ca: 1 } })

			!doc && fail(400, {errors: ['Root CA not found']})

			const cert = doc?.ca ? await createCert({...data, ca: doc.ca}) : null
			!cert && fail(400, {errors: ['Something went wrong trying to create the certificate']})

			await client.db(name).collection(certificates).insertOne({
				type: 'child',
				userId: session.user.id,
				cert,
				options: { ...data },				
				createdAt: new Date().getTime(),
				expiresAt: new Date().getTime() + daysToMilliseconds(data.validity),
			})

		} catch (error) {
			console.error(error);
			if (error instanceof ZodError) {
				console.log(error)
				return fail(400, { ...data, ...treeifyError(error) })
			}
			return fail(400, { ...data, errors: [`Something went wrong trying to insert the new document: ${error}`] })
		}

		redirect(303, `/dashboard`)
	}
}
