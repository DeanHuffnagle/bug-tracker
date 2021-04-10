import argon2 from 'argon2';
import {
	Arg,
	Ctx,
	Field,
	InputType,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { COOKIE_NAME } from '../constants';
import { Organization } from '../entities/Organization';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

@ObjectType()
class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}

@InputType()
export class UserRegisterInput {
	@Field()
	firstName: string;
	@Field()
	lastName: string;
	@Field()
	email: string;
	@Field()
	password: string;
}

@InputType()
export class UserLoginInput {
	@Field()
	email: string;
	@Field()
	password: string;
}

@InputType()
export class JoinOrganizationInput {
	@Field()
	organizationId: number;
	@Field()
	userId: number;
}

@InputType()
export class ChangeRoleInput {
	@Field()
	userId: number;
	@Field()
	userRole: string;
}

@Resolver(User)
export class UserResolver {
	//================================================================================
	//Register Mutation
	//================================================================================
	@Mutation(() => UserResponse)
	async register(
		@Arg('options') options: UserRegisterInput,
		@Ctx() { req }: MyContext
	) {
		const hashedPassword = await argon2.hash(options.password);
		let user;
		if (options.email.length < 7) {
			return {
				errors: [
					{
						field: 'email',
						message: 'invalid email.',
					},
				],
			};
		}
		if (!options.email.includes('@')) {
			return {
				errors: [
					{
						field: 'email',
						message: 'invalid email format.',
					},
				],
			};
		}
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(User)
				.values({
					firstName: options.firstName,
					lastName: options.lastName,
					email: options.email,
					password: hashedPassword,
				})
				.returning('*')
				.execute();
			console.log('result: ', result);
			user = result.raw[0];
		} catch (err) {
			console.log('error!: ', err);
			if (err.code === '23505') {
				return {
					errors: [
						{
							field: 'email',
							message: 'Email already in use.',
						},
					],
				};
			}
		}

		req.session.UserId = user.id;

		return { user };
	}

	//================================================================================
	//Login Mutation
	//================================================================================
	@Mutation(() => UserResponse)
	async login(
		@Arg('options') options: UserLoginInput,
		@Ctx() { req }: MyContext
	) {
		const user = await User.findOne({ where: { email: options.email } });
		console.log('first req.session.User.id: ', req.session.UserId);
		if (!user) {
			return {
				errors: [
					{
						field: 'email',
						message: 'invalid email.',
					},
				],
			};
		}
		const valid = await argon2.verify(user.password, options.password);
		if (!valid) {
			return {
				errors: [
					{
						field: 'password',
						message: 'incorrect password.',
					},
				],
			};
		}
		req.session.UserId = user.id;
		console.log('second req.session.User.id: ', req.session.UserId);

		return { user };
	}

	//================================================================================
	//Me Query
	//================================================================================
	@Query(() => User, { nullable: true })
	me(@Ctx() { req }: MyContext) {
		if (!req.session.UserId) {
			return null;
		}
		return User.findOne(req.session.UserId);
	}
	//================================================================================
	//Logout Mutation
	//================================================================================
	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: MyContext) {
		return new Promise((resolve) =>
			req.session.destroy((err) => {
				res.clearCookie(COOKIE_NAME);
				if (err) {
					console.log(err);
					resolve(false);
					return;
				}
				resolve(true);
			})
		);
	}
	//================================================================================
	//Change User Role Mutation
	//================================================================================
	// @Mutation(() => UserResponse)
	// @UseMiddleware(isAdmin)
	// changeUserRole() {}

	//================================================================================
	//Join Organization Mutation
	//================================================================================
	@Mutation(() => User, { nullable: true })
	@UseMiddleware(isAuth)
	async joinOrganizationMutation(
		@Arg('options') options: JoinOrganizationInput
	): Promise<User | null> {
		const organization = await Organization.findOne(options.organizationId);
		const user = await User.findOne(options.userId);
		console.log('user: ', user);
		console.log('organization: ', organization);
		if (!user) {
			console.log('user: ', user);
			throw new Error('no user found');
		}

		if (!organization) {
			throw new Error(' no organization found');
		}
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.update(User)
				.set({
					organizationId: options.organizationId,
				})
				.where('id = :id', { id: options.userId })
				.returning('*')
				.execute();

			console.log('result: ', result);
			const newUser = result.raw[0];
			return newUser;
		} catch (err) {
			console.log('error: ', err);
			return null;
		}
	}
}
