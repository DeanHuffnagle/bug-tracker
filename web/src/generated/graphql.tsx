import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AcceptOrDeclineRequestInput = {
  organizationId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type AddRepositoryLinkInput = {
  projectId: Scalars['Int'];
  repositoryLink: Scalars['String'];
};

export type AssignProjectInput = {
  projectId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type AssignTicketInput = {
  ticketId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type AssignTicketManagerInput = {
  ticketId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type ChangeOrganizationNameInput = {
  name: Scalars['String'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  repeatPassword: Scalars['String'];
};

export type ChangeRoleInput = {
  userId: Scalars['Float'];
  userRole: Scalars['String'];
};

export type ChangeTicketPriorityInput = {
  ticketId: Scalars['Int'];
  priority: Scalars['String'];
};

export type ChangeTicketStatusInput = {
  ticketId: Scalars['Int'];
  status: Scalars['String'];
};

export type ChangeTicketTypeInput = {
  ticketId: Scalars['Int'];
  type: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  text: Scalars['String'];
  commenterId: Scalars['Int'];
  ticketId: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  commenter: User;
  ticket: Ticket;
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  errors?: Maybe<Array<FieldError>>;
  comment?: Maybe<Comment>;
};

export type CreateOrganizationInput = {
  name: Scalars['String'];
  link?: Maybe<Scalars['String']>;
};

export type CreateProjectInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  repositoryLink?: Maybe<Scalars['String']>;
};

export type CreateTicketInput = {
  projectId: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
  ticketPriority: Scalars['String'];
  ticketType: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FindCommentInput = {
  commentId: Scalars['Int'];
};

export type FindCommentsByTicketInput = {
  ticketId: Scalars['Int'];
};

export type FindTicketsByPriorityInput = {
  priority: Scalars['String'];
};

export type FindTicketsByStatusInput = {
  status: Scalars['String'];
};

export type FindTicketsByTypeInput = {
  type: Scalars['String'];
};

export type FindUsersByJoinRequestInput = {
  organizationId: Scalars['Int'];
};

export type FindUsersByOrganizationInput = {
  organizationId: Scalars['Int'];
};

export type FindUsersByProjectInput = {
  projectId: Scalars['Int'];
};

export type JoinOrganizationInput = {
  organizationId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type JoinRequestInput = {
  organizationId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type LeaveOrganizationInput = {
  userId: Scalars['Float'];
};

export type MakeAdminInput = {
  userId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CommentResponse;
  deleteComment: Scalars['Int'];
  createOrganization: OrganizationResponse;
  deleteOrganization: Scalars['Boolean'];
  changeOrganizationName: OrganizationResponse;
  updateOrganization: OrganizationResponse;
  createProject: ProjectResponse;
  assignProject: ProjectResponse;
  unassignProject: ProjectResponse;
  assignProjectManager: ProjectResponse;
  unassignProjectManager: ProjectResponse;
  addRepositoryLink: ProjectResponse;
  updateProject: ProjectResponse;
  createTicket: TicketResponse;
  assignTicket: TicketResponse;
  assignTicketManager: TicketResponse;
  updateTicket: TicketResponse;
  changeTicketStatus: TicketResponse;
  changeTicketPriority: TicketResponse;
  changeTicketType: TicketResponse;
  register: UserResponse;
  login: UserResponse;
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  acceptJoinRequest: UserResponse;
  declineJoinRequest: UserResponse;
  logout: Scalars['Boolean'];
  makeAdmin: UserResponse;
  changeUserRole: UserResponse;
  joinRequest: UserResponse;
  joinOrganization: UserResponse;
  leaveOrganization: UserResponse;
  deleteUser: Scalars['Boolean'];
};


export type MutationCreateCommentArgs = {
  ticketId: Scalars['Int'];
  commentText: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int'];
};


export type MutationCreateOrganizationArgs = {
  options: CreateOrganizationInput;
};


export type MutationDeleteOrganizationArgs = {
  id: Scalars['Int'];
};


export type MutationChangeOrganizationNameArgs = {
  options: ChangeOrganizationNameInput;
};


export type MutationUpdateOrganizationArgs = {
  organizationId: Scalars['Int'];
  options: UpdateOrganizationInput;
};


export type MutationCreateProjectArgs = {
  options: CreateProjectInput;
};


export type MutationAssignProjectArgs = {
  options: AssignProjectInput;
};


export type MutationUnassignProjectArgs = {
  options: UnassignProjectInput;
};


export type MutationAssignProjectManagerArgs = {
  options: AssignProjectInput;
};


export type MutationUnassignProjectManagerArgs = {
  options: UnassignProjectInput;
};


export type MutationAddRepositoryLinkArgs = {
  options: AddRepositoryLinkInput;
};


export type MutationUpdateProjectArgs = {
  projectId: Scalars['Int'];
  options: UpdateProjectInput;
};


export type MutationCreateTicketArgs = {
  options: CreateTicketInput;
};


export type MutationAssignTicketArgs = {
  options: AssignTicketInput;
};


export type MutationAssignTicketManagerArgs = {
  options: AssignTicketManagerInput;
};


export type MutationUpdateTicketArgs = {
  ticketId: Scalars['Int'];
  options: UpdateTicketInput;
};


export type MutationChangeTicketStatusArgs = {
  options: ChangeTicketStatusInput;
};


export type MutationChangeTicketPriorityArgs = {
  options: ChangeTicketPriorityInput;
};


export type MutationChangeTicketTypeArgs = {
  options: ChangeTicketTypeInput;
};


export type MutationRegisterArgs = {
  options: UserRegisterInput;
};


export type MutationLoginArgs = {
  options: UserLoginInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  token: Scalars['String'];
  options: ChangePasswordInput;
};


export type MutationAcceptJoinRequestArgs = {
  options: AcceptOrDeclineRequestInput;
};


export type MutationDeclineJoinRequestArgs = {
  options: AcceptOrDeclineRequestInput;
};


export type MutationMakeAdminArgs = {
  options: MakeAdminInput;
};


export type MutationChangeUserRoleArgs = {
  options: ChangeRoleInput;
};


export type MutationJoinRequestArgs = {
  options: JoinRequestInput;
};


export type MutationJoinOrganizationArgs = {
  options: JoinOrganizationInput;
};


export type MutationLeaveOrganizationArgs = {
  options: LeaveOrganizationInput;
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Int'];
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['Int'];
  name: Scalars['String'];
  ownerId?: Maybe<Scalars['Int']>;
  link?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  users?: Maybe<Array<User>>;
  joinRequests?: Maybe<Array<User>>;
  joinRequestIds?: Maybe<Array<Scalars['Int']>>;
  owner: User;
  projects?: Maybe<Array<Project>>;
  tickets?: Maybe<Array<Ticket>>;
};

export type OrganizationResponse = {
  __typename?: 'OrganizationResponse';
  errors?: Maybe<Array<FieldError>>;
  organization?: Maybe<Organization>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  organizationId: Scalars['Int'];
  repositoryLink?: Maybe<Scalars['String']>;
  managerId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  manager?: Maybe<User>;
  assignedDevelopers?: Maybe<Array<User>>;
  assignedDeveloperIds?: Maybe<Array<Scalars['Int']>>;
  organization: Organization;
  tickets?: Maybe<Array<Ticket>>;
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  errors?: Maybe<Array<FieldError>>;
  project?: Maybe<Project>;
};

export type Query = {
  __typename?: 'Query';
  findComment: CommentResponse;
  findComments: Array<Comment>;
  findCommentsByTicket: Array<RawCommentResponse>;
  findOrganization?: Maybe<Organization>;
  findOrganizations?: Maybe<Array<Organization>>;
  findProject?: Maybe<Project>;
  findProjectsByOrganization?: Maybe<Array<Project>>;
  findRawAssignedProjects?: Maybe<Array<RawProjectResponse>>;
  findRawManagedProjects?: Maybe<Array<RawProjectResponse>>;
  findRawOrganizationProjects?: Maybe<Array<RawProjectResponse>>;
  findTicket?: Maybe<Ticket>;
  findTickets: Array<Ticket>;
  findAssignedTickets?: Maybe<Array<Ticket>>;
  findRawAssignedTickets?: Maybe<Array<RawTicketResponse>>;
  findRawOrganizationTickets?: Maybe<Array<RawTicketResponse>>;
  findRawTicketsByProject?: Maybe<Array<RawTicketResponse>>;
  findRawManagedTickets?: Maybe<Array<RawTicketResponse>>;
  findAssignedTicketsByPriority?: Maybe<Array<Ticket>>;
  findManagedTicketsByPriority?: Maybe<Array<Ticket>>;
  findOrganizationTicketsByPriority?: Maybe<Array<Ticket>>;
  findAssignedTicketsByStatus?: Maybe<Array<Ticket>>;
  findManagedTicketsByStatus?: Maybe<Array<Ticket>>;
  findOrganizationTicketsByStatus?: Maybe<Array<Ticket>>;
  findAssignedTicketsByType?: Maybe<Array<Ticket>>;
  findManagedTicketsByType?: Maybe<Array<Ticket>>;
  findOrganizationTicketsByType?: Maybe<Array<Ticket>>;
  me?: Maybe<User>;
  findUsersByOrganization?: Maybe<Array<User>>;
  findUsersByJoinRequest?: Maybe<Array<User>>;
  findUsersByProject?: Maybe<Array<User>>;
  findRawOrganizationUsers?: Maybe<Array<RawUserResponse>>;
};


export type QueryFindCommentArgs = {
  options: FindCommentInput;
};


export type QueryFindCommentsByTicketArgs = {
  options: FindCommentsByTicketInput;
};


export type QueryFindOrganizationArgs = {
  id: Scalars['Int'];
};


export type QueryFindProjectArgs = {
  id: Scalars['Int'];
};


export type QueryFindTicketArgs = {
  id: Scalars['Int'];
};


export type QueryFindRawTicketsByProjectArgs = {
  projectId: Scalars['Int'];
};


export type QueryFindAssignedTicketsByPriorityArgs = {
  options: FindTicketsByPriorityInput;
};


export type QueryFindManagedTicketsByPriorityArgs = {
  options: FindTicketsByPriorityInput;
};


export type QueryFindOrganizationTicketsByPriorityArgs = {
  options: FindTicketsByPriorityInput;
};


export type QueryFindAssignedTicketsByStatusArgs = {
  options: FindTicketsByStatusInput;
};


export type QueryFindManagedTicketsByStatusArgs = {
  options: FindTicketsByStatusInput;
};


export type QueryFindOrganizationTicketsByStatusArgs = {
  options: FindTicketsByStatusInput;
};


export type QueryFindAssignedTicketsByTypeArgs = {
  options: FindTicketsByTypeInput;
};


export type QueryFindManagedTicketsByTypeArgs = {
  options: FindTicketsByTypeInput;
};


export type QueryFindOrganizationTicketsByTypeArgs = {
  options: FindTicketsByTypeInput;
};


export type QueryFindUsersByOrganizationArgs = {
  options: FindUsersByOrganizationInput;
};


export type QueryFindUsersByJoinRequestArgs = {
  options: FindUsersByJoinRequestInput;
};


export type QueryFindUsersByProjectArgs = {
  options: FindUsersByProjectInput;
};

export type RawCommentResponse = {
  __typename?: 'RawCommentResponse';
  comment_id: Scalars['Int'];
  comment_text: Scalars['String'];
  comment_commenterId: Scalars['Int'];
  comment_ticketId: Scalars['Int'];
  comment_createdAt: Scalars['String'];
  commenter_id: Scalars['Int'];
  commenter_firstName: Scalars['String'];
  commenter_lastName: Scalars['String'];
  commenter_email: Scalars['String'];
  commenter_role: Scalars['String'];
};

export type RawProjectResponse = {
  __typename?: 'RawProjectResponse';
  project_id: Scalars['Int'];
  project_name: Scalars['String'];
  project_description: Scalars['String'];
  project_organizationId: Scalars['Int'];
  project_managerId: Scalars['Int'];
  project_createdAt: Scalars['String'];
  project_repositoryLink?: Maybe<Scalars['String']>;
  project_updatedAt: Scalars['String'];
  manager_id: Scalars['Int'];
  manager_firstName: Scalars['String'];
  manager_lastName: Scalars['String'];
  manager_email: Scalars['String'];
  manager_role: Scalars['String'];
  manager_organizationId: Scalars['Int'];
  manager_createdAt: Scalars['String'];
  manager_updatedAt: Scalars['String'];
};

export type RawTicketResponse = {
  __typename?: 'RawTicketResponse';
  ticket_id: Scalars['Int'];
  ticket_title: Scalars['String'];
  ticket_text: Scalars['String'];
  ticket_priority: Scalars['String'];
  ticket_status: Scalars['String'];
  ticket_type: Scalars['String'];
  ticket_organizationId: Scalars['String'];
  ticket_assignedDeveloperId?: Maybe<Scalars['Int']>;
  ticket_creatorId?: Maybe<Scalars['Int']>;
  ticket_projectId?: Maybe<Scalars['Int']>;
  ticket_submitterId?: Maybe<Scalars['Int']>;
  assignedDeveloper_id?: Maybe<Scalars['Int']>;
  assignedDeveloper_firstName?: Maybe<Scalars['String']>;
  assignedDeveloper_lastName?: Maybe<Scalars['String']>;
  assignedDeveloper_email?: Maybe<Scalars['String']>;
  assignedDeveloper_role?: Maybe<Scalars['String']>;
  assignedDeveloper_organizationId?: Maybe<Scalars['Int']>;
  assignedDeveloper_assignedProjectsId?: Maybe<Scalars['Int']>;
  assignedDeveloper_assignedTicketsId?: Maybe<Scalars['Int']>;
  submitter_id?: Maybe<Scalars['Int']>;
  submitter_firstName?: Maybe<Scalars['String']>;
  submitter_lastName?: Maybe<Scalars['String']>;
  submitter_email?: Maybe<Scalars['String']>;
  submitter_role?: Maybe<Scalars['String']>;
  submitter_organizationId?: Maybe<Scalars['Int']>;
  submitter_assignedProjectsId?: Maybe<Scalars['Int']>;
  submitter_assignedTicketsId?: Maybe<Scalars['Int']>;
  manager_id?: Maybe<Scalars['Int']>;
  manager_firstName?: Maybe<Scalars['String']>;
  manager_lastName?: Maybe<Scalars['String']>;
  manager_email?: Maybe<Scalars['String']>;
  manager_role?: Maybe<Scalars['String']>;
  manager_organizationId?: Maybe<Scalars['Int']>;
  manager_assignedProjectsId?: Maybe<Scalars['Int']>;
  manager_assignedTicketsId?: Maybe<Scalars['Int']>;
};

export type RawUserResponse = {
  __typename?: 'RawUserResponse';
  user_id: Scalars['Int'];
  user_firstName: Scalars['String'];
  user_lastName: Scalars['String'];
  user_email: Scalars['String'];
  user_role: Scalars['String'];
  user_createdAt: Scalars['String'];
  user_updatedAt: Scalars['String'];
};

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  priority: Scalars['String'];
  status: Scalars['String'];
  type: Scalars['String'];
  assignedDeveloperId?: Maybe<Scalars['Int']>;
  projectId: Scalars['Int'];
  managerId?: Maybe<Scalars['Int']>;
  submitterId?: Maybe<Scalars['Int']>;
  organizationId: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  assignedDeveloper?: Maybe<User>;
  submitter: User;
  project: Project;
  organization: Organization;
  manager?: Maybe<User>;
  comments?: Maybe<Comment>;
};

export type TicketResponse = {
  __typename?: 'TicketResponse';
  errors?: Maybe<Array<FieldError>>;
  ticket?: Maybe<Ticket>;
};

export type UnassignProjectInput = {
  projectId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type UpdateOrganizationInput = {
  name: Scalars['String'];
  link: Scalars['String'];
};

export type UpdateProjectInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  repositoryLink: Scalars['String'];
  userEmail?: Maybe<Scalars['String']>;
};

export type UpdateTicketInput = {
  ticketTitle: Scalars['String'];
  ticketText: Scalars['String'];
  ticketPriority: Scalars['String'];
  ticketStatus: Scalars['String'];
  ticketType: Scalars['String'];
  userEmail?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  role: Scalars['String'];
  organizationId?: Maybe<Scalars['Int']>;
  assignedTicketsId?: Maybe<Array<Scalars['Int']>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  assignedProjects?: Maybe<Array<Project>>;
  assignedProjectIds?: Maybe<Array<Scalars['Int']>>;
  organization?: Maybe<Organization>;
  joinRequest?: Maybe<Organization>;
  joinRequestId?: Maybe<Scalars['Int']>;
  managedProjects?: Maybe<Array<Project>>;
  managedProjectIds?: Maybe<Array<Scalars['Int']>>;
  managedTickets?: Maybe<Array<Ticket>>;
  managedTicketIds?: Maybe<Array<Scalars['Int']>>;
  ownedOrganization?: Maybe<Organization>;
  ownedOrganizationId?: Maybe<Scalars['Int']>;
  submittedTickets?: Maybe<Array<Ticket>>;
  comments?: Maybe<Comment>;
  assignedTickets?: Maybe<Array<Ticket>>;
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserRegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CommentFragmentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'text' | 'ticketId' | 'commenterId' | 'createdAt' | 'updatedAt'>
);

export type ErrorFragmentFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type OrganizationFragmentFragment = (
  { __typename?: 'Organization' }
  & Pick<Organization, 'id' | 'name' | 'ownerId' | 'link' | 'createdAt' | 'updatedAt'>
);

export type ProjectFragmentFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'id' | 'name' | 'description' | 'managerId' | 'assignedDeveloperIds' | 'organizationId' | 'repositoryLink' | 'createdAt' | 'updatedAt'>
);

export type RawCommentFragmentFragment = (
  { __typename?: 'RawCommentResponse' }
  & Pick<RawCommentResponse, 'comment_id' | 'comment_text' | 'comment_ticketId' | 'comment_createdAt' | 'commenter_id' | 'commenter_firstName' | 'commenter_lastName' | 'commenter_email' | 'commenter_role'>
);

export type RawProjectFragmentFragment = (
  { __typename?: 'RawProjectResponse' }
  & Pick<RawProjectResponse, 'project_id' | 'project_name' | 'project_description' | 'project_organizationId' | 'project_managerId' | 'project_createdAt' | 'project_updatedAt' | 'project_repositoryLink'>
);

export type RawProjectManagerFragmentFragment = (
  { __typename?: 'RawProjectResponse' }
  & Pick<RawProjectResponse, 'manager_id' | 'manager_firstName' | 'manager_lastName' | 'manager_email' | 'manager_role' | 'manager_organizationId' | 'manager_createdAt' | 'manager_updatedAt'>
);

export type RawProjectResponseFragmentFragment = (
  { __typename?: 'RawProjectResponse' }
  & RawProjectFragmentFragment
  & RawProjectManagerFragmentFragment
);

export type RawTicketAssignedDeveloperFragmentFragment = (
  { __typename?: 'RawTicketResponse' }
  & Pick<RawTicketResponse, 'assignedDeveloper_organizationId' | 'assignedDeveloper_id' | 'assignedDeveloper_firstName' | 'assignedDeveloper_lastName' | 'assignedDeveloper_email' | 'assignedDeveloper_role'>
);

export type RawTicketFragmentFragment = (
  { __typename?: 'RawTicketResponse' }
  & Pick<RawTicketResponse, 'ticket_id' | 'ticket_title' | 'ticket_text' | 'ticket_type' | 'ticket_priority' | 'ticket_status' | 'ticket_organizationId'>
);

export type RawTicketManagerFragmentFragment = (
  { __typename?: 'RawTicketResponse' }
  & Pick<RawTicketResponse, 'manager_organizationId' | 'manager_id' | 'manager_firstName' | 'manager_lastName' | 'manager_email' | 'manager_role'>
);

export type RawTicketResponseFragmentFragment = (
  { __typename?: 'RawTicketResponse' }
  & RawTicketFragmentFragment
  & RawTicketAssignedDeveloperFragmentFragment
  & RawTicketSubmitterFragmentFragment
  & RawTicketManagerFragmentFragment
);

export type RawTicketSubmitterFragmentFragment = (
  { __typename?: 'RawTicketResponse' }
  & Pick<RawTicketResponse, 'submitter_organizationId' | 'submitter_id' | 'submitter_firstName' | 'submitter_lastName' | 'submitter_email' | 'submitter_role'>
);

export type RawUserFragmentFragment = (
  { __typename?: 'RawUserResponse' }
  & Pick<RawUserResponse, 'user_id' | 'user_firstName' | 'user_lastName' | 'user_email' | 'user_role' | 'user_createdAt' | 'user_updatedAt'>
);

export type TicketFragmentFragment = (
  { __typename?: 'Ticket' }
  & Pick<Ticket, 'id' | 'title' | 'text' | 'status' | 'priority' | 'type' | 'assignedDeveloperId' | 'projectId' | 'createdAt' | 'updatedAt'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'organizationId' | 'joinRequestId' | 'createdAt' | 'updatedAt'>
);

export type AcceptJoinRequestMutationVariables = Exact<{
  options: AcceptOrDeclineRequestInput;
}>;


export type AcceptJoinRequestMutation = (
  { __typename?: 'Mutation' }
  & { acceptJoinRequest: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )> }
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  options: ChangePasswordInput;
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )> }
  ) }
);

export type CreateCommentMutationVariables = Exact<{
  commentText: Scalars['String'];
  ticketId: Scalars['Int'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'CommentResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, comment?: Maybe<(
      { __typename?: 'Comment' }
      & CommentFragmentFragment
    )> }
  ) }
);

export type CreateOrganizationMutationVariables = Exact<{
  options: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { createOrganization: (
    { __typename?: 'OrganizationResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, organization?: Maybe<(
      { __typename?: 'Organization' }
      & OrganizationFragmentFragment
    )> }
  ) }
);

export type CreateProjectMutationVariables = Exact<{
  options: CreateProjectInput;
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'ProjectResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, project?: Maybe<(
      { __typename?: 'Project' }
      & ProjectFragmentFragment
    )> }
  ) }
);

export type CreateTicketMutationVariables = Exact<{
  options: CreateTicketInput;
}>;


export type CreateTicketMutation = (
  { __typename?: 'Mutation' }
  & { createTicket: (
    { __typename?: 'TicketResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, ticket?: Maybe<(
      { __typename?: 'Ticket' }
      & TicketFragmentFragment
    )> }
  ) }
);

export type DeclineJoinRequestMutationVariables = Exact<{
  options: AcceptOrDeclineRequestInput;
}>;


export type DeclineJoinRequestMutation = (
  { __typename?: 'Mutation' }
  & { declineJoinRequest: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )> }
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Int'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type JoinRequestMutationVariables = Exact<{
  options: JoinRequestInput;
}>;


export type JoinRequestMutation = (
  { __typename?: 'Mutation' }
  & { joinRequest: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  options: UserLoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & { organization?: Maybe<(
        { __typename?: 'Organization' }
        & OrganizationFragmentFragment
      )> }
      & UserFragmentFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UserRegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )> }
  ) }
);

export type UpdateOrganizationMutationVariables = Exact<{
  organizationId: Scalars['Int'];
  options: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { updateOrganization: (
    { __typename?: 'OrganizationResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, organization?: Maybe<(
      { __typename?: 'Organization' }
      & OrganizationFragmentFragment
    )> }
  ) }
);

export type UpdateProjectMutationVariables = Exact<{
  options: UpdateProjectInput;
  projectId: Scalars['Int'];
}>;


export type UpdateProjectMutation = (
  { __typename?: 'Mutation' }
  & { updateProject: (
    { __typename?: 'ProjectResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, project?: Maybe<(
      { __typename?: 'Project' }
      & ProjectFragmentFragment
    )> }
  ) }
);

export type UpdateTicketMutationVariables = Exact<{
  options: UpdateTicketInput;
  ticketId: Scalars['Int'];
}>;


export type UpdateTicketMutation = (
  { __typename?: 'Mutation' }
  & { updateTicket: (
    { __typename?: 'TicketResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, ticket?: Maybe<(
      { __typename?: 'Ticket' }
      & TicketFragmentFragment
    )> }
  ) }
);

export type FindAssignedTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAssignedTicketsQuery = (
  { __typename?: 'Query' }
  & { findAssignedTickets?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & { assignedDeveloper?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )> }
    & TicketFragmentFragment
  )>> }
);

export type FindAssignedTicketsByPriorityQueryVariables = Exact<{
  options: FindTicketsByPriorityInput;
}>;


export type FindAssignedTicketsByPriorityQuery = (
  { __typename?: 'Query' }
  & { findAssignedTicketsByPriority?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & TicketFragmentFragment
  )>> }
);

export type FindAssignedTicketsByStatusQueryVariables = Exact<{
  options: FindTicketsByStatusInput;
}>;


export type FindAssignedTicketsByStatusQuery = (
  { __typename?: 'Query' }
  & { findAssignedTicketsByStatus?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & TicketFragmentFragment
  )>> }
);

export type FindAssignedTicketsByTypeQueryVariables = Exact<{
  options: FindTicketsByTypeInput;
}>;


export type FindAssignedTicketsByTypeQuery = (
  { __typename?: 'Query' }
  & { findAssignedTicketsByType?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & TicketFragmentFragment
  )>> }
);

export type FindCommentsByTicketQueryVariables = Exact<{
  options: FindCommentsByTicketInput;
}>;


export type FindCommentsByTicketQuery = (
  { __typename?: 'Query' }
  & { findCommentsByTicket: Array<(
    { __typename?: 'RawCommentResponse' }
    & RawCommentFragmentFragment
  )> }
);

export type FindManagedTicketsByPriorityQueryVariables = Exact<{
  options: FindTicketsByPriorityInput;
}>;


export type FindManagedTicketsByPriorityQuery = (
  { __typename?: 'Query' }
  & { findManagedTicketsByPriority?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & TicketFragmentFragment
  )>> }
);

export type FindManagedTicketsByStatusQueryVariables = Exact<{
  options: FindTicketsByStatusInput;
}>;


export type FindManagedTicketsByStatusQuery = (
  { __typename?: 'Query' }
  & { findManagedTicketsByStatus?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & TicketFragmentFragment
  )>> }
);

export type FindManagedTicketsByTypeQueryVariables = Exact<{
  options: FindTicketsByTypeInput;
}>;


export type FindManagedTicketsByTypeQuery = (
  { __typename?: 'Query' }
  & { findManagedTicketsByType?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & TicketFragmentFragment
  )>> }
);

export type FindOrganizationQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindOrganizationQuery = (
  { __typename?: 'Query' }
  & { findOrganization?: Maybe<(
    { __typename?: 'Organization' }
    & OrganizationFragmentFragment
  )> }
);

export type FindOrganizationTicketsByPriorityQueryVariables = Exact<{
  options: FindTicketsByPriorityInput;
}>;


export type FindOrganizationTicketsByPriorityQuery = (
  { __typename?: 'Query' }
  & { findOrganizationTicketsByPriority?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & TicketFragmentFragment
  )>> }
);

export type FindOrganizationTicketsByStatusQueryVariables = Exact<{
  options: FindTicketsByStatusInput;
}>;


export type FindOrganizationTicketsByStatusQuery = (
  { __typename?: 'Query' }
  & { findOrganizationTicketsByStatus?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & TicketFragmentFragment
  )>> }
);

export type FindOrganizationTicketsByTypeQueryVariables = Exact<{
  options: FindTicketsByTypeInput;
}>;


export type FindOrganizationTicketsByTypeQuery = (
  { __typename?: 'Query' }
  & { findOrganizationTicketsByType?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & TicketFragmentFragment
  )>> }
);

export type FindOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindOrganizationsQuery = (
  { __typename?: 'Query' }
  & { findOrganizations?: Maybe<Array<(
    { __typename?: 'Organization' }
    & OrganizationFragmentFragment
  )>> }
);

export type FindProjectQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindProjectQuery = (
  { __typename?: 'Query' }
  & { findProject?: Maybe<(
    { __typename?: 'Project' }
    & { manager?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )> }
    & ProjectFragmentFragment
  )> }
);

export type FindProjectsByOrganizationQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProjectsByOrganizationQuery = (
  { __typename?: 'Query' }
  & { findProjectsByOrganization?: Maybe<Array<(
    { __typename?: 'Project' }
    & { organization: (
      { __typename?: 'Organization' }
      & OrganizationFragmentFragment
    ) }
    & ProjectFragmentFragment
  )>> }
);

export type FindRawAssignedProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRawAssignedProjectsQuery = (
  { __typename?: 'Query' }
  & { findRawAssignedProjects?: Maybe<Array<(
    { __typename?: 'RawProjectResponse' }
    & RawProjectResponseFragmentFragment
  )>> }
);

export type FindRawAssignedTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRawAssignedTicketsQuery = (
  { __typename?: 'Query' }
  & { findRawAssignedTickets?: Maybe<Array<(
    { __typename?: 'RawTicketResponse' }
    & RawTicketResponseFragmentFragment
  )>> }
);

export type FindRawManagedProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRawManagedProjectsQuery = (
  { __typename?: 'Query' }
  & { findRawManagedProjects?: Maybe<Array<(
    { __typename?: 'RawProjectResponse' }
    & RawProjectResponseFragmentFragment
  )>> }
);

export type FindRawManagedTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRawManagedTicketsQuery = (
  { __typename?: 'Query' }
  & { findRawManagedTickets?: Maybe<Array<(
    { __typename?: 'RawTicketResponse' }
    & RawTicketResponseFragmentFragment
  )>> }
);

export type FindRawOrganizationProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRawOrganizationProjectsQuery = (
  { __typename?: 'Query' }
  & { findRawOrganizationProjects?: Maybe<Array<(
    { __typename?: 'RawProjectResponse' }
    & RawProjectResponseFragmentFragment
  )>> }
);

export type FindRawOrganizationTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRawOrganizationTicketsQuery = (
  { __typename?: 'Query' }
  & { findRawOrganizationTickets?: Maybe<Array<(
    { __typename?: 'RawTicketResponse' }
    & RawTicketResponseFragmentFragment
  )>> }
);

export type FindRawOrganizationUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRawOrganizationUsersQuery = (
  { __typename?: 'Query' }
  & { findRawOrganizationUsers?: Maybe<Array<(
    { __typename?: 'RawUserResponse' }
    & RawUserFragmentFragment
  )>> }
);

export type FindRawTicketsByProjectQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type FindRawTicketsByProjectQuery = (
  { __typename?: 'Query' }
  & { findRawTicketsByProject?: Maybe<Array<(
    { __typename?: 'RawTicketResponse' }
    & RawTicketResponseFragmentFragment
  )>> }
);

export type FindTicketQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindTicketQuery = (
  { __typename?: 'Query' }
  & { findTicket?: Maybe<(
    { __typename?: 'Ticket' }
    & { assignedDeveloper?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )> }
    & TicketFragmentFragment
  )> }
);

export type FindUsersByJoinRequestQueryVariables = Exact<{
  options: FindUsersByJoinRequestInput;
}>;


export type FindUsersByJoinRequestQuery = (
  { __typename?: 'Query' }
  & { findUsersByJoinRequest?: Maybe<Array<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )>> }
);

export type FindUsersByOrganizationQueryVariables = Exact<{
  options: FindUsersByOrganizationInput;
}>;


export type FindUsersByOrganizationQuery = (
  { __typename?: 'Query' }
  & { findUsersByOrganization?: Maybe<Array<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )>> }
);

export type FindUsersByProjectQueryVariables = Exact<{
  options: FindUsersByProjectInput;
}>;


export type FindUsersByProjectQuery = (
  { __typename?: 'Query' }
  & { findUsersByProject?: Maybe<Array<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & { organization?: Maybe<(
      { __typename?: 'Organization' }
      & OrganizationFragmentFragment
    )>, assignedProjects?: Maybe<Array<(
      { __typename?: 'Project' }
      & ProjectFragmentFragment
    )>>, managedProjects?: Maybe<Array<(
      { __typename?: 'Project' }
      & ProjectFragmentFragment
    )>> }
    & UserFragmentFragment
  )> }
);

export const CommentFragmentFragmentDoc = gql`
    fragment commentFragment on Comment {
  id
  text
  ticketId
  commenterId
  createdAt
  updatedAt
}
    `;
export const ErrorFragmentFragmentDoc = gql`
    fragment errorFragment on FieldError {
  field
  message
}
    `;
export const OrganizationFragmentFragmentDoc = gql`
    fragment organizationFragment on Organization {
  id
  name
  ownerId
  link
  createdAt
  updatedAt
}
    `;
export const ProjectFragmentFragmentDoc = gql`
    fragment projectFragment on Project {
  id
  name
  description
  managerId
  assignedDeveloperIds
  organizationId
  repositoryLink
  createdAt
  updatedAt
}
    `;
export const RawCommentFragmentFragmentDoc = gql`
    fragment rawCommentFragment on RawCommentResponse {
  comment_id
  comment_text
  comment_ticketId
  comment_createdAt
  commenter_id
  commenter_firstName
  commenter_lastName
  commenter_email
  commenter_role
}
    `;
export const RawProjectFragmentFragmentDoc = gql`
    fragment rawProjectFragment on RawProjectResponse {
  project_id
  project_name
  project_description
  project_organizationId
  project_managerId
  project_createdAt
  project_updatedAt
  project_repositoryLink
}
    `;
export const RawProjectManagerFragmentFragmentDoc = gql`
    fragment rawProjectManagerFragment on RawProjectResponse {
  manager_id
  manager_firstName
  manager_lastName
  manager_email
  manager_role
  manager_organizationId
  manager_createdAt
  manager_updatedAt
}
    `;
export const RawProjectResponseFragmentFragmentDoc = gql`
    fragment rawProjectResponseFragment on RawProjectResponse {
  ...rawProjectFragment
  ...rawProjectManagerFragment
}
    ${RawProjectFragmentFragmentDoc}
${RawProjectManagerFragmentFragmentDoc}`;
export const RawTicketFragmentFragmentDoc = gql`
    fragment rawTicketFragment on RawTicketResponse {
  ticket_id
  ticket_title
  ticket_text
  ticket_type
  ticket_priority
  ticket_status
  ticket_organizationId
}
    `;
export const RawTicketAssignedDeveloperFragmentFragmentDoc = gql`
    fragment rawTicketAssignedDeveloperFragment on RawTicketResponse {
  assignedDeveloper_organizationId
  assignedDeveloper_id
  assignedDeveloper_firstName
  assignedDeveloper_lastName
  assignedDeveloper_email
  assignedDeveloper_role
}
    `;
export const RawTicketSubmitterFragmentFragmentDoc = gql`
    fragment rawTicketSubmitterFragment on RawTicketResponse {
  submitter_organizationId
  submitter_id
  submitter_firstName
  submitter_lastName
  submitter_email
  submitter_role
}
    `;
export const RawTicketManagerFragmentFragmentDoc = gql`
    fragment rawTicketManagerFragment on RawTicketResponse {
  manager_organizationId
  manager_id
  manager_firstName
  manager_lastName
  manager_email
  manager_role
}
    `;
export const RawTicketResponseFragmentFragmentDoc = gql`
    fragment rawTicketResponseFragment on RawTicketResponse {
  ...rawTicketFragment
  ...rawTicketAssignedDeveloperFragment
  ...rawTicketSubmitterFragment
  ...rawTicketManagerFragment
}
    ${RawTicketFragmentFragmentDoc}
${RawTicketAssignedDeveloperFragmentFragmentDoc}
${RawTicketSubmitterFragmentFragmentDoc}
${RawTicketManagerFragmentFragmentDoc}`;
export const RawUserFragmentFragmentDoc = gql`
    fragment rawUserFragment on RawUserResponse {
  user_id
  user_firstName
  user_lastName
  user_email
  user_role
  user_createdAt
  user_updatedAt
}
    `;
export const TicketFragmentFragmentDoc = gql`
    fragment ticketFragment on Ticket {
  id
  title
  text
  status
  priority
  type
  assignedDeveloperId
  projectId
  createdAt
  updatedAt
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment userFragment on User {
  id
  firstName
  lastName
  email
  role
  organizationId
  joinRequestId
  createdAt
  updatedAt
}
    `;
export const AcceptJoinRequestDocument = gql`
    mutation AcceptJoinRequest($options: AcceptOrDeclineRequestInput!) {
  acceptJoinRequest(options: $options) {
    errors {
      ...errorFragment
    }
    user {
      ...userFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useAcceptJoinRequestMutation() {
  return Urql.useMutation<AcceptJoinRequestMutation, AcceptJoinRequestMutationVariables>(AcceptJoinRequestDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($options: ChangePasswordInput!, $token: String!) {
  changePassword(options: $options, token: $token) {
    errors {
      ...errorFragment
    }
    user {
      ...userFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateCommentDocument = gql`
    mutation CreateComment($commentText: String!, $ticketId: Int!) {
  createComment(commentText: $commentText, ticketId: $ticketId) {
    errors {
      ...errorFragment
    }
    comment {
      ...commentFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${CommentFragmentFragmentDoc}`;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
};
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($options: CreateOrganizationInput!) {
  createOrganization(options: $options) {
    errors {
      ...errorFragment
    }
    organization {
      ...organizationFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${OrganizationFragmentFragmentDoc}`;

export function useCreateOrganizationMutation() {
  return Urql.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument);
};
export const CreateProjectDocument = gql`
    mutation CreateProject($options: CreateProjectInput!) {
  createProject(options: $options) {
    errors {
      ...errorFragment
    }
    project {
      ...projectFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}`;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const CreateTicketDocument = gql`
    mutation CreateTicket($options: CreateTicketInput!) {
  createTicket(options: $options) {
    errors {
      ...errorFragment
    }
    ticket {
      ...ticketFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${TicketFragmentFragmentDoc}`;

export function useCreateTicketMutation() {
  return Urql.useMutation<CreateTicketMutation, CreateTicketMutationVariables>(CreateTicketDocument);
};
export const DeclineJoinRequestDocument = gql`
    mutation DeclineJoinRequest($options: AcceptOrDeclineRequestInput!) {
  declineJoinRequest(options: $options) {
    errors {
      ...errorFragment
    }
    user {
      ...userFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useDeclineJoinRequestMutation() {
  return Urql.useMutation<DeclineJoinRequestMutation, DeclineJoinRequestMutationVariables>(DeclineJoinRequestDocument);
};
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: Int!) {
  deleteComment(commentId: $commentId)
}
    `;

export function useDeleteCommentMutation() {
  return Urql.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const JoinRequestDocument = gql`
    mutation JoinRequest($options: JoinRequestInput!) {
  joinRequest(options: $options) {
    errors {
      ...errorFragment
    }
    user {
      ...userFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useJoinRequestMutation() {
  return Urql.useMutation<JoinRequestMutation, JoinRequestMutationVariables>(JoinRequestDocument);
};
export const LoginDocument = gql`
    mutation Login($options: UserLoginInput!) {
  login(options: $options) {
    errors {
      ...errorFragment
    }
    user {
      ...userFragment
      organization {
        ...organizationFragment
      }
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}
${OrganizationFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UserRegisterInput!) {
  register(options: $options) {
    errors {
      ...errorFragment
    }
    user {
      ...userFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateOrganizationDocument = gql`
    mutation UpdateOrganization($organizationId: Int!, $options: UpdateOrganizationInput!) {
  updateOrganization(organizationId: $organizationId, options: $options) {
    errors {
      ...errorFragment
    }
    organization {
      ...organizationFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${OrganizationFragmentFragmentDoc}`;

export function useUpdateOrganizationMutation() {
  return Urql.useMutation<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument);
};
export const UpdateProjectDocument = gql`
    mutation UpdateProject($options: UpdateProjectInput!, $projectId: Int!) {
  updateProject(options: $options, projectId: $projectId) {
    errors {
      ...errorFragment
    }
    project {
      ...projectFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}`;

export function useUpdateProjectMutation() {
  return Urql.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument);
};
export const UpdateTicketDocument = gql`
    mutation UpdateTicket($options: UpdateTicketInput!, $ticketId: Int!) {
  updateTicket(options: $options, ticketId: $ticketId) {
    errors {
      ...errorFragment
    }
    ticket {
      ...ticketFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${TicketFragmentFragmentDoc}`;

export function useUpdateTicketMutation() {
  return Urql.useMutation<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument);
};
export const FindAssignedTicketsDocument = gql`
    query FindAssignedTickets {
  findAssignedTickets {
    ...ticketFragment
    assignedDeveloper {
      ...userFragment
    }
  }
}
    ${TicketFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useFindAssignedTicketsQuery(options: Omit<Urql.UseQueryArgs<FindAssignedTicketsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindAssignedTicketsQuery>({ query: FindAssignedTicketsDocument, ...options });
};
export const FindAssignedTicketsByPriorityDocument = gql`
    query FindAssignedTicketsByPriority($options: FindTicketsByPriorityInput!) {
  findAssignedTicketsByPriority(options: $options) {
    ...ticketFragment
  }
}
    ${TicketFragmentFragmentDoc}`;

export function useFindAssignedTicketsByPriorityQuery(options: Omit<Urql.UseQueryArgs<FindAssignedTicketsByPriorityQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindAssignedTicketsByPriorityQuery>({ query: FindAssignedTicketsByPriorityDocument, ...options });
};
export const FindAssignedTicketsByStatusDocument = gql`
    query FindAssignedTicketsByStatus($options: FindTicketsByStatusInput!) {
  findAssignedTicketsByStatus(options: $options) {
    ...ticketFragment
  }
}
    ${TicketFragmentFragmentDoc}`;

export function useFindAssignedTicketsByStatusQuery(options: Omit<Urql.UseQueryArgs<FindAssignedTicketsByStatusQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindAssignedTicketsByStatusQuery>({ query: FindAssignedTicketsByStatusDocument, ...options });
};
export const FindAssignedTicketsByTypeDocument = gql`
    query FindAssignedTicketsByType($options: FindTicketsByTypeInput!) {
  findAssignedTicketsByType(options: $options) {
    ...ticketFragment
  }
}
    ${TicketFragmentFragmentDoc}`;

export function useFindAssignedTicketsByTypeQuery(options: Omit<Urql.UseQueryArgs<FindAssignedTicketsByTypeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindAssignedTicketsByTypeQuery>({ query: FindAssignedTicketsByTypeDocument, ...options });
};
export const FindCommentsByTicketDocument = gql`
    query FindCommentsByTicket($options: FindCommentsByTicketInput!) {
  findCommentsByTicket(options: $options) {
    ...rawCommentFragment
  }
}
    ${RawCommentFragmentFragmentDoc}`;

export function useFindCommentsByTicketQuery(options: Omit<Urql.UseQueryArgs<FindCommentsByTicketQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindCommentsByTicketQuery>({ query: FindCommentsByTicketDocument, ...options });
};
export const FindManagedTicketsByPriorityDocument = gql`
    query FindManagedTicketsByPriority($options: FindTicketsByPriorityInput!) {
  findManagedTicketsByPriority(options: $options) {
    ...ticketFragment
  }
}
    ${TicketFragmentFragmentDoc}`;

export function useFindManagedTicketsByPriorityQuery(options: Omit<Urql.UseQueryArgs<FindManagedTicketsByPriorityQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindManagedTicketsByPriorityQuery>({ query: FindManagedTicketsByPriorityDocument, ...options });
};
export const FindManagedTicketsByStatusDocument = gql`
    query FindManagedTicketsByStatus($options: FindTicketsByStatusInput!) {
  findManagedTicketsByStatus(options: $options) {
    ...ticketFragment
  }
}
    ${TicketFragmentFragmentDoc}`;

export function useFindManagedTicketsByStatusQuery(options: Omit<Urql.UseQueryArgs<FindManagedTicketsByStatusQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindManagedTicketsByStatusQuery>({ query: FindManagedTicketsByStatusDocument, ...options });
};
export const FindManagedTicketsByTypeDocument = gql`
    query FindManagedTicketsByType($options: FindTicketsByTypeInput!) {
  findManagedTicketsByType(options: $options) {
    ...ticketFragment
  }
}
    ${TicketFragmentFragmentDoc}`;

export function useFindManagedTicketsByTypeQuery(options: Omit<Urql.UseQueryArgs<FindManagedTicketsByTypeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindManagedTicketsByTypeQuery>({ query: FindManagedTicketsByTypeDocument, ...options });
};
export const FindOrganizationDocument = gql`
    query FindOrganization($id: Int!) {
  findOrganization(id: $id) {
    ...organizationFragment
  }
}
    ${OrganizationFragmentFragmentDoc}`;

export function useFindOrganizationQuery(options: Omit<Urql.UseQueryArgs<FindOrganizationQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindOrganizationQuery>({ query: FindOrganizationDocument, ...options });
};
export const FindOrganizationTicketsByPriorityDocument = gql`
    query FindOrganizationTicketsByPriority($options: FindTicketsByPriorityInput!) {
  findOrganizationTicketsByPriority(options: $options) {
    ...ticketFragment
  }
}
    ${TicketFragmentFragmentDoc}`;

export function useFindOrganizationTicketsByPriorityQuery(options: Omit<Urql.UseQueryArgs<FindOrganizationTicketsByPriorityQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindOrganizationTicketsByPriorityQuery>({ query: FindOrganizationTicketsByPriorityDocument, ...options });
};
export const FindOrganizationTicketsByStatusDocument = gql`
    query FindOrganizationTicketsByStatus($options: FindTicketsByStatusInput!) {
  findOrganizationTicketsByStatus(options: $options) {
    ...ticketFragment
  }
}
    ${TicketFragmentFragmentDoc}`;

export function useFindOrganizationTicketsByStatusQuery(options: Omit<Urql.UseQueryArgs<FindOrganizationTicketsByStatusQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindOrganizationTicketsByStatusQuery>({ query: FindOrganizationTicketsByStatusDocument, ...options });
};
export const FindOrganizationTicketsByTypeDocument = gql`
    query FindOrganizationTicketsByType($options: FindTicketsByTypeInput!) {
  findOrganizationTicketsByType(options: $options) {
    ...ticketFragment
  }
}
    ${TicketFragmentFragmentDoc}`;

export function useFindOrganizationTicketsByTypeQuery(options: Omit<Urql.UseQueryArgs<FindOrganizationTicketsByTypeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindOrganizationTicketsByTypeQuery>({ query: FindOrganizationTicketsByTypeDocument, ...options });
};
export const FindOrganizationsDocument = gql`
    query FindOrganizations {
  findOrganizations {
    ...organizationFragment
  }
}
    ${OrganizationFragmentFragmentDoc}`;

export function useFindOrganizationsQuery(options: Omit<Urql.UseQueryArgs<FindOrganizationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindOrganizationsQuery>({ query: FindOrganizationsDocument, ...options });
};
export const FindProjectDocument = gql`
    query FindProject($id: Int!) {
  findProject(id: $id) {
    ...projectFragment
    manager {
      ...userFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useFindProjectQuery(options: Omit<Urql.UseQueryArgs<FindProjectQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindProjectQuery>({ query: FindProjectDocument, ...options });
};
export const FindProjectsByOrganizationDocument = gql`
    query FindProjectsByOrganization {
  findProjectsByOrganization {
    ...projectFragment
    organization {
      ...organizationFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${OrganizationFragmentFragmentDoc}`;

export function useFindProjectsByOrganizationQuery(options: Omit<Urql.UseQueryArgs<FindProjectsByOrganizationQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindProjectsByOrganizationQuery>({ query: FindProjectsByOrganizationDocument, ...options });
};
export const FindRawAssignedProjectsDocument = gql`
    query FindRawAssignedProjects {
  findRawAssignedProjects {
    ...rawProjectResponseFragment
  }
}
    ${RawProjectResponseFragmentFragmentDoc}`;

export function useFindRawAssignedProjectsQuery(options: Omit<Urql.UseQueryArgs<FindRawAssignedProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindRawAssignedProjectsQuery>({ query: FindRawAssignedProjectsDocument, ...options });
};
export const FindRawAssignedTicketsDocument = gql`
    query FindRawAssignedTickets {
  findRawAssignedTickets {
    ...rawTicketResponseFragment
  }
}
    ${RawTicketResponseFragmentFragmentDoc}`;

export function useFindRawAssignedTicketsQuery(options: Omit<Urql.UseQueryArgs<FindRawAssignedTicketsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindRawAssignedTicketsQuery>({ query: FindRawAssignedTicketsDocument, ...options });
};
export const FindRawManagedProjectsDocument = gql`
    query FindRawManagedProjects {
  findRawManagedProjects {
    ...rawProjectResponseFragment
  }
}
    ${RawProjectResponseFragmentFragmentDoc}`;

export function useFindRawManagedProjectsQuery(options: Omit<Urql.UseQueryArgs<FindRawManagedProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindRawManagedProjectsQuery>({ query: FindRawManagedProjectsDocument, ...options });
};
export const FindRawManagedTicketsDocument = gql`
    query FindRawManagedTickets {
  findRawManagedTickets {
    ...rawTicketResponseFragment
  }
}
    ${RawTicketResponseFragmentFragmentDoc}`;

export function useFindRawManagedTicketsQuery(options: Omit<Urql.UseQueryArgs<FindRawManagedTicketsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindRawManagedTicketsQuery>({ query: FindRawManagedTicketsDocument, ...options });
};
export const FindRawOrganizationProjectsDocument = gql`
    query FindRawOrganizationProjects {
  findRawOrganizationProjects {
    ...rawProjectResponseFragment
  }
}
    ${RawProjectResponseFragmentFragmentDoc}`;

export function useFindRawOrganizationProjectsQuery(options: Omit<Urql.UseQueryArgs<FindRawOrganizationProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindRawOrganizationProjectsQuery>({ query: FindRawOrganizationProjectsDocument, ...options });
};
export const FindRawOrganizationTicketsDocument = gql`
    query FindRawOrganizationTickets {
  findRawOrganizationTickets {
    ...rawTicketResponseFragment
  }
}
    ${RawTicketResponseFragmentFragmentDoc}`;

export function useFindRawOrganizationTicketsQuery(options: Omit<Urql.UseQueryArgs<FindRawOrganizationTicketsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindRawOrganizationTicketsQuery>({ query: FindRawOrganizationTicketsDocument, ...options });
};
export const FindRawOrganizationUsersDocument = gql`
    query FindRawOrganizationUsers {
  findRawOrganizationUsers {
    ...rawUserFragment
  }
}
    ${RawUserFragmentFragmentDoc}`;

export function useFindRawOrganizationUsersQuery(options: Omit<Urql.UseQueryArgs<FindRawOrganizationUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindRawOrganizationUsersQuery>({ query: FindRawOrganizationUsersDocument, ...options });
};
export const FindRawTicketsByProjectDocument = gql`
    query FindRawTicketsByProject($projectId: Int!) {
  findRawTicketsByProject(projectId: $projectId) {
    ...rawTicketResponseFragment
  }
}
    ${RawTicketResponseFragmentFragmentDoc}`;

export function useFindRawTicketsByProjectQuery(options: Omit<Urql.UseQueryArgs<FindRawTicketsByProjectQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindRawTicketsByProjectQuery>({ query: FindRawTicketsByProjectDocument, ...options });
};
export const FindTicketDocument = gql`
    query FindTicket($id: Int!) {
  findTicket(id: $id) {
    ...ticketFragment
    assignedDeveloper {
      ...userFragment
    }
  }
}
    ${TicketFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useFindTicketQuery(options: Omit<Urql.UseQueryArgs<FindTicketQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindTicketQuery>({ query: FindTicketDocument, ...options });
};
export const FindUsersByJoinRequestDocument = gql`
    query FindUsersByJoinRequest($options: FindUsersByJoinRequestInput!) {
  findUsersByJoinRequest(options: $options) {
    ...userFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useFindUsersByJoinRequestQuery(options: Omit<Urql.UseQueryArgs<FindUsersByJoinRequestQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindUsersByJoinRequestQuery>({ query: FindUsersByJoinRequestDocument, ...options });
};
export const FindUsersByOrganizationDocument = gql`
    query FindUsersByOrganization($options: FindUsersByOrganizationInput!) {
  findUsersByOrganization(options: $options) {
    ...userFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useFindUsersByOrganizationQuery(options: Omit<Urql.UseQueryArgs<FindUsersByOrganizationQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindUsersByOrganizationQuery>({ query: FindUsersByOrganizationDocument, ...options });
};
export const FindUsersByProjectDocument = gql`
    query FindUsersByProject($options: FindUsersByProjectInput!) {
  findUsersByProject(options: $options) {
    ...userFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useFindUsersByProjectQuery(options: Omit<Urql.UseQueryArgs<FindUsersByProjectQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindUsersByProjectQuery>({ query: FindUsersByProjectDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...userFragment
    organization {
      ...organizationFragment
    }
    assignedProjects {
      ...projectFragment
    }
    managedProjects {
      ...projectFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${OrganizationFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};