import argon2 from 'argon2';
import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { getConnection, getRepository } from 'typeorm';
import { v4 } from 'uuid';
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from '../constants';
import { Organization } from '../entities/Organization';
import { Project } from '../entities/Project';
import { User } from '../entities/User';
import { isAdmin } from '../middleware/isAdmin';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import {
	ChangePasswordInput,
	ChangeRoleInput,
	FindUsersByOrganizationInput,
	FindUsersByProjectInput,
	JoinOrganizationInput,
	LeaveOrganizationInput,
	MakeAdminInput,
	UserLoginInput,
	UserRegisterInput,
} from '../utils/inputTypes';
import { RawUserResponse, UserResponse } from '../utils/objectTypes';
import { sendEmail } from '../utils/sendEmail';

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
		if (!options.firstName) {
			return {
				errors: [
					{
						field: 'firstName',
						message: 'Must have a first name.',
					},
				],
			};
		}
		if (!options.lastName) {
			return {
				errors: [
					{
						field: 'lastName',
						message: 'Must have a last name.',
					},
				],
			};
		}
		if (options.email.length < 7) {
			return {
				errors: [
					{
						field: 'email',
						message: 'Invalid email.',
					},
				],
			};
		}
		if (!options.email.includes('@')) {
			return {
				errors: [
					{
						field: 'email',
						message: 'Invalid email format.',
					},
				],
			};
		}
		if (options.password.length < 4) {
			return {
				errors: [
					{
						field: 'password',
						message: 'Length must be greater than 3.',
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
	//Forgot Password Mutation
	//================================================================================
	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg('email') email: string,
		@Ctx() { redis }: MyContext
	): Promise<Boolean> {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			//the email is not in the database
			return true;
		}

		const token = v4();

		await redis.set(
			FORGOT_PASSWORD_PREFIX + token,
			user.id,
			'ex',
			1000 * 60 * 60 * 24 * 3 // 3 days
		);

		sendEmail(
			email,
			`<a href="http:localhost:3000/change-password/${token}">reset password</a>`
		);
		return true;
	}
	//================================================================================
	//Change Password Mutation
	//================================================================================
	@Mutation(() => UserResponse)
	async changePassword(
		@Arg('options') options: ChangePasswordInput,
		@Arg('token') token: string,
		@Ctx() { req, redis }: MyContext
	): Promise<UserResponse> {
		const key = FORGOT_PASSWORD_PREFIX + token;
		const userId = await redis.get(key);
		if (!userId) {
			return {
				errors: [
					{
						field: 'token',
						message: 'token expired.',
					},
				],
			};
		}
		if (options.newPassword !== options.repeatPassword) {
			return {
				errors: [
					{
						field: 'repeatPassword',
						message: 'Passwords do not match.',
					},
				],
			};
		}
		if (options.newPassword.length < 4) {
			return {
				errors: [
					{
						field: 'newPassword',
						message: 'Length must be greater than 3.',
					},
				],
			};
		}
		const userIdNum = parseInt(userId);
		const user = await User.findOne(userIdNum);

		if (!user) {
			return {
				errors: [
					{
						field: 'user',
						message: 'no user exists.',
					},
				],
			};
		}

		await User.update(
			{ id: user.id },
			{ password: await argon2.hash(options.newPassword) }
		);

		await redis.del(key);

		req.session.UserId = user.id;

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
		return User.findOne(req.session.UserId, {
			relations: [
				'organization',
				'assignedProjects',
				'managedProjects',
				'ownedOrganization',
			],
		});
	}
	//================================================================================
	//Find Users By Organization Query
	//================================================================================
	@Query(() => [User], { nullable: true })
	async findUsersByOrganization(
		@Arg('options') options: FindUsersByOrganizationInput
	): Promise<User[]> {
		const usersByOrganization = await getRepository(User)
			.createQueryBuilder('user')
			.where('user.organizationId = :organizationId', {
				organizationId: options.organizationId,
			})
			.getMany();
		return usersByOrganization;
	}
	//================================================================================
	//Find Users By Project Query
	//================================================================================
	@Query(() => [User], { nullable: true })
	async findUsersByProject(
		@Arg('options') options: FindUsersByProjectInput
	): Promise<User[]> {
		const isProject = await Project.findOne(options.projectId);
		const usersByProject = await getRepository(User)
			.createQueryBuilder('user')
			.where('user.id in (:...assignedDeveloperIds)', {
				assignedDeveloperIds: isProject?.assignedDeveloperIds,
			})
			.getMany();

		return usersByProject;
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
	//Make Admin Mutation
	//================================================================================
	@Mutation(() => UserResponse)
	async makeAdmin(@Arg('options') options: MakeAdminInput) {
		const isUser = await User.findOne(options.userId);
		if (!isUser) {
			return {
				errors: [
					{
						field: 'user',
						message: 'no user found.',
					},
				],
			};
		}
		await User.update({ id: options.userId }, { role: 'admin' });
		const user = await User.findOne(options.userId);
		return { user };
	}
	//================================================================================
	//Change User Role Mutation
	//================================================================================
	@Mutation(() => UserResponse)
	@UseMiddleware(isAdmin)
	async changeUserRole(@Arg('options') options: ChangeRoleInput) {
		const unchangedUser = await User.findOne(options.userId);
		if (!unchangedUser) {
			return {
				errors: [
					{
						field: 'user',
						message: 'no user found.',
					},
				],
			};
		}
		await User.update({ id: options.userId }, { role: options.userRole });
		const user = await User.findOne(options.userId);
		return { user };
	}

	//================================================================================
	//Join Organization Mutation
	//================================================================================
	@Mutation(() => UserResponse)
	@UseMiddleware(isAuth)
	async joinOrganizationMutation(
		@Arg('options') options: JoinOrganizationInput
	): Promise<UserResponse> {
		const isOrganization = await Organization.findOne(options.organizationId);
		const isUser = await User.findOne(options.userId);
		if (!isUser) {
			return {
				errors: [
					{
						field: 'user',
						message: 'no user found.',
					},
				],
			};
		}
		if (!isOrganization) {
			return {
				errors: [
					{
						field: 'organization',
						message: 'no organization found.',
					},
				],
			};
		}
		await getConnection()
			.createQueryBuilder()
			.relation(User, 'organization')
			.of(isUser)
			.set(isOrganization);

		const user = await User.findOne(options.userId, {
			relations: ['organization'],
		});
		return { user };
	}
	//================================================================================
	//Leave Organization Mutation
	//================================================================================
	@Mutation(() => UserResponse)
	@UseMiddleware(isAuth)
	async leaveOrganizationMutation(
		@Arg('options') options: LeaveOrganizationInput
	): Promise<UserResponse> {
		const isUser = await User.findOne(options.userId);
		const isOrganization = await Organization.findOne();
		if (!isUser) {
			return {
				errors: [
					{
						field: 'user',
						message: 'no user found.',
					},
				],
			};
		}
		if (isUser.id === isOrganization?.ownerId) {
			await getConnection()
				.createQueryBuilder()
				.relation(User, 'ownedOrganization')
				.of(isUser)
				.set(null);
		}

		await getConnection()
			.createQueryBuilder()
			.relation(User, 'organization')
			.of(isUser)
			.set(null);

		const user = await User.findOne(options.userId, {
			relations: ['organization'],
		});
		return { user };
	}
	//================================================================================
	//Delete User Mutation
	//================================================================================
	@Mutation(() => Boolean)
	async deleteUser(@Arg('userId', () => Int) userId: number): Promise<Boolean> {
		const isUser = await User.findOne(userId);
		if (!isUser) {
			return false;
		} else {
			await User.delete(isUser.id);
			return true;
		}
	}
	//================================================================================
	//Find Raw Organization Users Query
	//================================================================================
	@Query(() => [RawUserResponse], { nullable: true })
	async findRawOrganizationUsers(
		@Ctx() { req }: MyContext
	): Promise<RawUserResponse[]> {
		const isUser = await User.findOne(req.session.UserId);

		const organizationUsers = await getRepository(User)
			.createQueryBuilder('user')
			.where('user.organizationId = :id ', {
				id: isUser?.organizationId,
			})
			.getRawMany();
		return organizationUsers;
	}
}
