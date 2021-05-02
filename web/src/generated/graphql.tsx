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

export type AssignProjectInput = {
  projectId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type AssignTicketInput = {
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
};

export type CreateProjectInput = {
  name: Scalars['String'];
  description: Scalars['String'];
};

export type CreateTicketInput = {
  projectId: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FindAssignedTicketsByPriorityInput = {
  priority: Scalars['String'];
};

export type FindAssignedTicketsByStatusInput = {
  status: Scalars['String'];
};

export type FindAssignedTicketsByTypeInput = {
  type: Scalars['String'];
};

export type FindCommentInput = {
  commentId: Scalars['Int'];
};

export type FindCommentsByTicketInput = {
  ticketId: Scalars['Int'];
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

export type LeaveOrganizationInput = {
  userId: Scalars['Float'];
};

export type MakeAdminInput = {
  userId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CommentResponse;
  createOrganization: OrganizationResponse;
  deleteOrganization: Scalars['Boolean'];
  changeOrganizationName: OrganizationResponse;
  createProject: ProjectResponse;
  assignProject: ProjectResponse;
  unassignProject: ProjectResponse;
  assignProjectManager: ProjectResponse;
  unassignProjectManager: ProjectResponse;
  createTicket: TicketResponse;
  assignTicket: TicketResponse;
  updateTicket: TicketResponse;
  changeTicketStatus: TicketResponse;
  changeTicketPriority: TicketResponse;
  changeTicketType: TicketResponse;
  register: UserResponse;
  login: UserResponse;
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  logout: Scalars['Boolean'];
  makeAdmin: UserResponse;
  changeUserRole: UserResponse;
  joinOrganizationMutation: UserResponse;
  leaveOrganizationMutation: UserResponse;
};


export type MutationCreateCommentArgs = {
  ticketId: Scalars['Int'];
  commentText: Scalars['String'];
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


export type MutationCreateTicketArgs = {
  options: CreateTicketInput;
};


export type MutationAssignTicketArgs = {
  options: AssignTicketInput;
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


export type MutationMakeAdminArgs = {
  options: MakeAdminInput;
};


export type MutationChangeUserRoleArgs = {
  options: ChangeRoleInput;
};


export type MutationJoinOrganizationMutationArgs = {
  options: JoinOrganizationInput;
};


export type MutationLeaveOrganizationMutationArgs = {
  options: LeaveOrganizationInput;
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['Int'];
  name: Scalars['String'];
  creatorId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  users?: Maybe<Array<User>>;
  creator: User;
  projects?: Maybe<Array<Project>>;
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
  findCommentsByTicket: Array<Comment>;
  findOrganization?: Maybe<Organization>;
  findProject?: Maybe<Project>;
  findTicket?: Maybe<Ticket>;
  findTickets: Array<Ticket>;
  findAssignedTickets?: Maybe<Array<Ticket>>;
  findRawAssignedTickets?: Maybe<Array<RawTicketResponse>>;
  findAssignedTicketsByPriority?: Maybe<Array<Ticket>>;
  findAssignedTicketsByStatus?: Maybe<Array<Ticket>>;
  findAssignedTicketsByType?: Maybe<Array<Ticket>>;
  me?: Maybe<User>;
  findUsersByOrganization?: Maybe<Array<User>>;
  findUsersByProject?: Maybe<Array<User>>;
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


export type QueryFindAssignedTicketsByPriorityArgs = {
  options: FindAssignedTicketsByPriorityInput;
};


export type QueryFindAssignedTicketsByStatusArgs = {
  options: FindAssignedTicketsByStatusInput;
};


export type QueryFindAssignedTicketsByTypeArgs = {
  options: FindAssignedTicketsByTypeInput;
};


export type QueryFindUsersByOrganizationArgs = {
  options: FindUsersByOrganizationInput;
};


export type QueryFindUsersByProjectArgs = {
  options: FindUsersByProjectInput;
};

export type RawTicketResponse = {
  __typename?: 'RawTicketResponse';
  ticket_id: Scalars['Int'];
  ticket_title: Scalars['String'];
  ticket_text: Scalars['String'];
  ticket_priority: Scalars['String'];
  ticket_status: Scalars['String'];
  ticket_type: Scalars['String'];
  ticket_assignedDeveloperId?: Maybe<Scalars['Int']>;
  ticket_creatorId?: Maybe<Scalars['Int']>;
  ticket_projectId?: Maybe<Scalars['Int']>;
  ticket_submitterId?: Maybe<Scalars['Int']>;
  assignedDeveloper_id: Scalars['Int'];
  assignedDeveloper_firstName: Scalars['String'];
  assignedDeveloper_lastName: Scalars['String'];
  assignedDeveloper_email: Scalars['String'];
  assignedDeveloper_role: Scalars['String'];
  assignedDeveloper_organizationId?: Maybe<Scalars['Int']>;
  assignedDeveloper_assignedProjectsId?: Maybe<Scalars['Int']>;
  assignedDeveloper_assignedTicketsId?: Maybe<Scalars['Int']>;
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
  creatorId: Scalars['Int'];
  projectId: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  assignedDeveloper?: Maybe<User>;
  submitter: User;
  project: Project;
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
  assignedProjectsId?: Maybe<Array<Scalars['Int']>>;
  assignedTicketsId?: Maybe<Array<Scalars['Int']>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  assignedProjects?: Maybe<Array<Project>>;
  organization?: Maybe<Organization>;
  managedProjects?: Maybe<Array<Project>>;
  createdOrganization: Organization;
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
  & Pick<Organization, 'id' | 'name' | 'creatorId' | 'createdAt' | 'updatedAt'>
);

export type ProjectFragmentFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'id' | 'name' | 'description' | 'managerId' | 'organizationId' | 'createdAt' | 'updatedAt'>
);

export type RawTicketFragmentFragment = (
  { __typename?: 'RawTicketResponse' }
  & Pick<RawTicketResponse, 'ticket_id' | 'ticket_title' | 'ticket_text' | 'ticket_type' | 'ticket_priority' | 'ticket_status' | 'assignedDeveloper_id' | 'assignedDeveloper_firstName' | 'assignedDeveloper_lastName' | 'assignedDeveloper_email' | 'assignedDeveloper_role'>
);

export type TicketFragmentFragment = (
  { __typename?: 'Ticket' }
  & Pick<Ticket, 'id' | 'title' | 'text' | 'status' | 'priority' | 'type' | 'assignedDeveloperId' | 'creatorId' | 'projectId' | 'createdAt' | 'updatedAt'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'createdAt' | 'updatedAt'>
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

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
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
  options: FindAssignedTicketsByPriorityInput;
}>;


export type FindAssignedTicketsByPriorityQuery = (
  { __typename?: 'Query' }
  & { findAssignedTicketsByPriority?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & TicketFragmentFragment
  )>> }
);

export type FindAssignedTicketsByStatusQueryVariables = Exact<{
  options: FindAssignedTicketsByStatusInput;
}>;


export type FindAssignedTicketsByStatusQuery = (
  { __typename?: 'Query' }
  & { findAssignedTicketsByStatus?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & TicketFragmentFragment
  )>> }
);

export type FindAssignedTicketsByTypeQueryVariables = Exact<{
  options: FindAssignedTicketsByTypeInput;
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
    { __typename?: 'Comment' }
    & { commenter: (
      { __typename?: 'User' }
      & UserFragmentFragment
    ) }
    & CommentFragmentFragment
  )> }
);

export type FindRawAssignedTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRawAssignedTicketsQuery = (
  { __typename?: 'Query' }
  & { findRawAssignedTickets?: Maybe<Array<(
    { __typename?: 'RawTicketResponse' }
    & RawTicketFragmentFragment
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
  creatorId
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
  organizationId
  createdAt
  updatedAt
}
    `;
export const RawTicketFragmentFragmentDoc = gql`
    fragment rawTicketFragment on RawTicketResponse {
  ticket_id
  ticket_title
  ticket_text
  ticket_type
  ticket_priority
  ticket_status
  assignedDeveloper_id
  assignedDeveloper_firstName
  assignedDeveloper_lastName
  assignedDeveloper_email
  assignedDeveloper_role
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
  creatorId
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
  createdAt
  updatedAt
}
    `;
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
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
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
    query FindAssignedTicketsByPriority($options: FindAssignedTicketsByPriorityInput!) {
  findAssignedTicketsByPriority(options: $options) {
    ...ticketFragment
  }
}
    ${TicketFragmentFragmentDoc}`;

export function useFindAssignedTicketsByPriorityQuery(options: Omit<Urql.UseQueryArgs<FindAssignedTicketsByPriorityQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindAssignedTicketsByPriorityQuery>({ query: FindAssignedTicketsByPriorityDocument, ...options });
};
export const FindAssignedTicketsByStatusDocument = gql`
    query FindAssignedTicketsByStatus($options: FindAssignedTicketsByStatusInput!) {
  findAssignedTicketsByStatus(options: $options) {
    ...ticketFragment
  }
}
    ${TicketFragmentFragmentDoc}`;

export function useFindAssignedTicketsByStatusQuery(options: Omit<Urql.UseQueryArgs<FindAssignedTicketsByStatusQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindAssignedTicketsByStatusQuery>({ query: FindAssignedTicketsByStatusDocument, ...options });
};
export const FindAssignedTicketsByTypeDocument = gql`
    query FindAssignedTicketsByType($options: FindAssignedTicketsByTypeInput!) {
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
    ...commentFragment
    commenter {
      ...userFragment
    }
  }
}
    ${CommentFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useFindCommentsByTicketQuery(options: Omit<Urql.UseQueryArgs<FindCommentsByTicketQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindCommentsByTicketQuery>({ query: FindCommentsByTicketDocument, ...options });
};
export const FindRawAssignedTicketsDocument = gql`
    query FindRawAssignedTickets {
  findRawAssignedTickets {
    ...rawTicketFragment
  }
}
    ${RawTicketFragmentFragmentDoc}`;

export function useFindRawAssignedTicketsQuery(options: Omit<Urql.UseQueryArgs<FindRawAssignedTicketsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindRawAssignedTicketsQuery>({ query: FindRawAssignedTicketsDocument, ...options });
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