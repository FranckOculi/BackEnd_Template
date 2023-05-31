import { Team } from 'src/types/team'
import MigrationsRepository from '../migrations.config/MigrationsRepository'

export const seed = async () => {
	// create team if it doesn't exist

	const repository = new MigrationsRepository('teams')
	const teamSafeFields = ['id', 'name', 'description', 'updatedAt', 'createdAt']

	const team1 = await repository.findOne<Partial<Team>>({
		where: { id: 1 },
		select: teamSafeFields,
	})

	if (!team1) {
		await repository.create<Partial<Team>>({
			id: 1,
			name: 'Team React',
			description: 'Groupe de travail',
			createdAt: new Date(),
		})
	}

	const team2 = await repository.findOne<Partial<Team>>({
		where: { id: 2 },
		select: teamSafeFields,
	})

	if (!team2) {
		await repository.create<Partial<Team>>({
			id: 2,
			name: 'Groupe GitHub',
			description: 'Groupe de présentation des projets',
			createdAt: new Date(),
		})
	}

	return null
}