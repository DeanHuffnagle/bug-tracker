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
	UpdateOrganizationInput,
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
	): Promise<OrganizationResponse> {
		const isUser = await User.findOne(req.session.UserId);
		let organization;
		try {
			if (!options.link) {
				const result = await getConnection()
					.createQueryBuilder()
					.insert()
					.into(Organization)
					.values({
						name: options.name,
						ownerId: isUser?.id,
					})
					.returning('*')
					.execute();
				organization = result.raw[0];
			} else {
				const result = await getConnection()
					.createQueryBuilder()
					.insert()
					.into(Organization)
					.values({
						name: options.name,
						ownerId: isUser?.id,
						link: options.link,
					})
					.returning('*')
					.execute();
				organization = result.raw[0];
			}
		} catch (err) {
			if (err.code === '23505') {
				return {
					errors: [
						{
							field: 'name',
							message: 'organization already exists with that name.',
						},
					],
				};
			}
		}

		await User.update(
			{ id: isUser?.id },
			{ organizationId: organization.id, role: 'admin' }
		);

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
		const isUser = await User.findOne(req.session.UserId);
		const isOrganization = await Organization.findOne(id);
		if (!isOrganization) {
			return false;
		}
		if (isOrganization.ownerId !== isUser?.id) {
			return false;
		}

		await Organization.delete({ id });
		await User.update({ id: isUser?.id }, { role: 'developer' });
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
		return Organization.findOne(id, { relations: ['owner'] });
	}
	//================================================================================
	//Find Organizations Query
	//================================================================================
	@Query(() => [Organization], { nullable: true })
	findOrganizations(): Promise<Organization[] | undefined> {
		return Organization.find();
	}
	//================================================================================
	//Update Organization Mutation
	//================================================================================
	@Mutation(() => OrganizationResponse)
	@UseMiddleware(isAdmin)
	async updateOrganization(
		@Arg('options') options: UpdateOrganizationInput,
		@Arg('organizationId', () => Int) organizationId: number
	): Promise<OrganizationResponse> {
		if (!options.name) {
			return {
				errors: [
					{
						field: 'organizationName',
						message: 'cannot be blank.',
					},
				],
			};
		}

		await getConnection()
			.createQueryBuilder()
			.update(Organization)
			.set({
				name: options.name,
				link: options.link,
			})
			.where('id = :id', { id: organizationId })
			.execute();

		const organization = await Organization.findOne(organizationId);
		return { organization };
	}
}
