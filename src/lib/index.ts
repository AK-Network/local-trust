import * as z from "zod"; 

// place files you want to import through the `$lib` alias in this folder.
export const CASchema = z.object({
	organization: z.string().min(3).max(64).trim(),
	countryCode: z.string().toUpperCase().min(2).max(2).trim(),
	state: z.string().min(3).max(64).trim(),
	locality: z.string().min(2).max(64).trim(),
	validity: z.number().min(1).max(3650),
});


// place files you want to import through the `$lib` alias in this folder.
export const ProjectSchema = z.object({
	projectName: z.string().min(3).max(64).trim(),
	domains: z.array(z.string().min(1).trim()).min(1),
	organization: z.string().min(3).max(64).trim().optional(),
	email: z.email().trim().optional(),
	validity: z.number().min(1).max(3650),
});


export const config = {
	db: {
		name: 'localTrust',
		collections: {
			users: 'users',
			certificates: 'certificates'
		}
	}
}