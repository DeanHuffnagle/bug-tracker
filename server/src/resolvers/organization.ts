import {
	Arg,
	Ctx,
	Field,
	InputType,
	Int,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Organization } from '../entities/Organization';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

@ObjectType()
class OrganizationFieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class OrganizationResponse {
	@Field(() => [OrganizationFieldError], { nullable: true })
	errors?: OrganizationFieldError[];

	@Field(() => Organization, { nullable: true })
	organization?: Organization;
}

@InputType()
export class CreateOrganizationInput {
	@Field()
	name!: string;
}

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
			console.log('result.raw: ', result.raw);
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
	//Find Organization Query
	//================================================================================
	@Query(() => Organization, { nullable: true })
	findOrganization(
		@Arg('id', () => Int) id: number
	): Promise<Organization | undefined> {
		return Organization.findOne(id);
	}
}
