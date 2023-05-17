import bcrypt from 'bcrypt'

import { findByEmail } from '../../../repositories/userRepository.js'
import Token from '../../../utils/Token.js'

export const loginService = async (data) => {
	try {
		const user = await findByEmail(data.email, [
			'id',
			'teamId',
			'email',
			'password',
			'access',
		])

		if (!user)
			return {
				error: 'That email and password combination is incorrect',
				status: 401,
			}

		const isValidPassword = await bcrypt.compare(data.password, user.password)

		if (!isValidPassword)
			return {
				error: 'That email and password combination is incorrect',
				status: 401,
			}

		const refreshToken = Token.createToken(
			{
				id: user.id,
				email: user.email,
				access: user.access,
			},
			'3d'
		)

		const accessToken = Token.createToken({
			id: user.id,
			email: user.email,
			access: user.access,
		})

		return {
			error: null,
			data: {
				user: user.id,
				accessToken,
				refreshTokenObject: {
					refreshToken,
					options: {
						httpOnly: true,
						sameSite: 'None',
						secure: true,
						maxAge: 60 * 60 * 24 * 3,
					},
				},
			},
		}
	} catch (err) {
		throw new Error('Unable to complete signin')
	}
}
