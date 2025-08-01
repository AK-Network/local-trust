import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks'
import { handle as authenticationHandle } from "./auth"

const handleParaglide: (options: any) => Handle =
	(options) => ({ event, resolve }) => paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

export const handle: Handle = sequence(authenticationHandle, handleParaglide({}));
