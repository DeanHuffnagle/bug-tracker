import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Organization } from '../entities/Organization';
import { User } from '../entities/User';
import { isAdmin } from '../middleware/isAdmin';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import {
	ChangeOrganizationNameInput,
	CreateOrganizationInput,
} from '../utils/inputTypes';
import { OrganizationResponse } from '../utils/objectTypes';

@Resolver(Organization)
export class OrganizationResolver {
	//================================================================================
	//Create Organization Mutation
	//================================================================================
	@Mutation(() => OrganizationResponse)
	@UseMiddleware(isAuth)
	async createOrganization(
		@Arg('options') options: CreateOrganizationInput,
		@Ctx() { req }: MyContext
	) {
		let organization;
		try {
			console.log('req.session.userID: ', req.session.UserId);
			const result = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(Organization)
				.values({
					name: options.name,
					creatorId: req.session.UserId,
				})
				.returning('*')
				.execute();
			organization = result.raw[0];
		} catch (err) {
			console.log('error: ', err);
		}
		return { organization };
	}

	//================================================================================
	//Delete Organization Mutation
	//================================================================================
	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async deleteOrganization(
		@Arg('id', () => Int) id: number,
		@Ctx() { req }: MyContext
	): Promise<Boolean> {
		const organization = await Organization.findOne(id);
		if (!organization) {
			return false;
		}
		if (organization.creatorId !== req.session.UserId) {
			return false;
		}

		await Organization.delete({ id });
		return true;
	}

	//================================================================================
	//Change Organization Name
	//================================================================================
	@Mutation(() => OrganizationResponse)
	@UseMiddleware(isAdmin)
	async changeOrganizationName(
		@Arg('options') options: ChangeOrganizationNameInput,
		@Ctx() { req }: MyContext
	) {
		const isUser = await User.findOne(req.session.UserId);
		if (!isUser?.organizationId) {
			return {
				errors: [
					{
						field: 'user',
						message: 'user does not belong to any organization.',
					},
				],
			};
		}
		const isOrganization = await Organization.findOne(isUser?.organizationId);
		console.log('organization: ', isOrganization);
		let organization;

		await Organization.update(
			{ id: isOrganization?.id },
			{ name: options.name }
		);
		organization = Organization.findOne(isOrganization?.id);
		return { organization };
	}

	//================================================================================
	//Find Organization Query
	//================================================================================
	@Query(() => Organization, { nullable: true })
	findOrganization(
		@Arg('id', () => Int) id: number
	): Promise<Organization | undefined> {
		return Organization.findOne(id, { relations: ['creator'] });
	}
	//================================================================================
	//Find Organizations Query
	//================================================================================
	@Query(() => [Organization], { nullable: true })
	findOrganizations(): Promise<Organization[] | undefined> {
		return Organization.find();
	}
}
