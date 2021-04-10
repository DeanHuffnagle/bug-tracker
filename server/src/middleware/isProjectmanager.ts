import { MiddlewareFn } from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from '../types';

export const isProjectManager: MiddlewareFn<MyContext> = async (
	{ context },
	next
) => {
	const user = await User.findOne(context.req.session.UserId);
	if (!user) {
		throw new Error('no user logged in');
	}
	if (user.role === 'admin') {
		return next();
	}
	if (user?.role === 'projectManager') {
		return next();
	} else {
		throw new Error('user not authorized to perform that action');
	}
};
