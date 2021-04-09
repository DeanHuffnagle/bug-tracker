import {
	Arg,
	Ctx,
	Field,
	InputType,
	Mutation,
	ObjectType,
	Resolver,
} from 'type-graphql';
import { getConnection, getRepository } from 'typeorm';
import { Organization } from '../entities/Organization';
import { User } from '../entities/User';
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
	async createOrganization(
		@Arg('options') options: CreateOrganizationInput,
		@Ctx() { req }: MyContext
	) {
		if (!req.session.UserId) {
			return {
				errors: [
					{
						field: 'user',
						message: 'no user is logged in.',
					},
				],
			};
		}
		let organization;
		try {
			console.log('req.session.userID: ', req.session.UserId);
			const result = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(Organization)
				.values({
					name: options.name,
					userId: [req.session.UserId],
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
}
