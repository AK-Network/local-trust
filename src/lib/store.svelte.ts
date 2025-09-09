import type { LoadEvent, ServerLoadEvent } from "@sveltejs/kit";
import type { Certificate, CertificateAuthorityOptions } from "mkcert";

type AbstractCert = {
	_id: string
	userId: string
	createdAt: number
	expiresAt: number
}

type RootCert = {
	type: 'root'
	ca: Certificate
	options: CertificateAuthorityOptions
} & AbstractCert

type ProjectCert = {
	type: 'child'
	ca: Certificate
	options: CertificateAuthorityOptions
} & AbstractCert

class CertManager {
	certificates: any[] = $state([])




	async getCertificates(event: LoadEvent|ServerLoadEvent, fresh = false) {
		if(fresh || !this.certificates.length) {
			console.log('getCertificates')
			const res = await event.fetch('/api/certificates')
			const json = await res.json() as { data: { certificates: any[] } }
			this.certificates = json.data.certificates
		}
		return this.certificates
	}


	get rootCA(): RootCert|null {
		return this.certificates?.filter((certificate) => certificate.type === 'root')[0] ?? null
	}

	get projects(): ProjectCert[]|null {
		return this.certificates?.filter((certificate) => certificate.type === 'child') ?? null
	}
}

export const certManager = new CertManager()