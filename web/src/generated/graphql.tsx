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

export type CommentFieldError = {
  __typename?: 'CommentFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  errors?: Maybe<Array<CommentFieldError>>;
  comment?: Maybe<Comment>;
};

export type CreateCommentInput = {
  ticketId: Scalars['Int'];
  commentText: Scalars['String'];
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
  commentId: Scalars['Float'];
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
  options: CreateCommentInput;
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
  users?: Maybe<Array<User>>;
  creator: User;
  projects?: Maybe<Array<Project>>;
};

export type OrganizationFieldError = {
  __typename?: 'OrganizationFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type OrganizationResponse = {
  __typename?: 'OrganizationResponse';
  errors?: Maybe<Array<OrganizationFieldError>>;
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
  organization: Organization;
  tickets?: Maybe<Array<Ticket>>;
};

export type ProjectFieldError = {
  __typename?: 'ProjectFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  errors?: Maybe<Array<ProjectFieldError>>;
  project?: Maybe<Project>;
};

export type Query = {
  __typename?: 'Query';
  findComment: CommentResponse;
  findOrganization?: Maybe<Organization>;
  findProject?: Maybe<Project>;
  findTicket?: Maybe<Ticket>;
  findTickets: Array<Ticket>;
  findAssignedTickets?: Maybe<Array<Ticket>>;
  findAssignedTicketsByPriority?: Maybe<Array<Ticket>>;
  findAssignedTicketsByStatus?: Maybe<Array<Ticket>>;
  findAssignedTicketsByType?: Maybe<Array<Ticket>>;
  me?: Maybe<User>;
};


export type QueryFindCommentArgs = {
  options: FindCommentInput;
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

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  assignedDeveloperId?: Maybe<Scalars['Int']>;
  creatorId: Scalars['Int'];
  projectId: Scalars['Int'];
  priority: Scalars['String'];
  status: Scalars['String'];
  type: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  assignedDeveloper?: Maybe<User>;
  submitter: User;
  project: Project;
  comments?: Maybe<Comment>;
};

export type TicketFieldError = {
  __typename?: 'TicketFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type TicketResponse = {
  __typename?: 'TicketResponse';
  errors?: Maybe<Array<TicketFieldError>>;
  ticket?: Maybe<Ticket>;
};

export type UnassignProjectInput = {
  projectId: Scalars['Int'];
  userId: Scalars['Int'];
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
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
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
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'role'>
      & { organization?: Maybe<(
        { __typename?: 'Organization' }
        & Pick<Organization, 'id' | 'name' | 'creatorId'>
      )> }
    )> }
  ) }
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
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    )> }
  ) }
);

export type FindAssignedTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAssignedTicketsQuery = (
  { __typename?: 'Query' }
  & { findAssignedTickets?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & Pick<Ticket, 'id' | 'title' | 'text' | 'priority' | 'status' | 'type' | 'assignedDeveloperId'>
  )>> }
);

export type FindAssignedTicketsByPriorityQueryVariables = Exact<{
  options: FindAssignedTicketsByPriorityInput;
}>;


export type FindAssignedTicketsByPriorityQuery = (
  { __typename?: 'Query' }
  & { findAssignedTicketsByPriority?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & Pick<Ticket, 'id' | 'title' | 'text' | 'priority' | 'status' | 'type' | 'assignedDeveloperId'>
  )>> }
);

export type FindAssignedTicketsByStatusQueryVariables = Exact<{
  options: FindAssignedTicketsByStatusInput;
}>;


export type FindAssignedTicketsByStatusQuery = (
  { __typename?: 'Query' }
  & { findAssignedTicketsByStatus?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & Pick<Ticket, 'id' | 'title' | 'text' | 'priority' | 'status' | 'type' | 'assignedDeveloperId'>
  )>> }
);

export type FindAssignedTicketsByTypeQueryVariables = Exact<{
  options: FindAssignedTicketsByTypeInput;
}>;


export type FindAssignedTicketsByTypeQuery = (
  { __typename?: 'Query' }
  & { findAssignedTicketsByType?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & Pick<Ticket, 'id' | 'title' | 'text' | 'priority' | 'status' | 'type' | 'assignedDeveloperId'>
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'role'>
    & { organization?: Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'name'>
    )>, assignedProjects?: Maybe<Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name'>
    )>>, managedProjects?: Maybe<Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name'>
    )>> }
  )> }
);


export const ChangePasswordDocument = gql`
    mutation ChangePassword($options: ChangePasswordInput!, $token: String!) {
  changePassword(options: $options, token: $token) {
    errors {
      field
      message
    }
    user {
      id
      firstName
      lastName
      email
    }
  }
}
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($options: UserLoginInput!) {
  login(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      firstName
      lastName
      email
      role
      organization {
        id
        name
        creatorId
      }
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UserRegisterInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      firstName
      lastName
      email
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const FindAssignedTicketsDocument = gql`
    query FindAssignedTickets {
  findAssignedTickets {
    id
    title
    text
    priority
    status
    type
    assignedDeveloperId
  }
}
    `;

export function useFindAssignedTicketsQuery(options: Omit<Urql.UseQueryArgs<FindAssignedTicketsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindAssignedTicketsQuery>({ query: FindAssignedTicketsDocument, ...options });
};
export const FindAssignedTicketsByPriorityDocument = gql`
    query FindAssignedTicketsByPriority($options: FindAssignedTicketsByPriorityInput!) {
  findAssignedTicketsByPriority(options: $options) {
    id
    title
    text
    priority
    status
    type
    assignedDeveloperId
  }
}
    `;

export function useFindAssignedTicketsByPriorityQuery(options: Omit<Urql.UseQueryArgs<FindAssignedTicketsByPriorityQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindAssignedTicketsByPriorityQuery>({ query: FindAssignedTicketsByPriorityDocument, ...options });
};
export const FindAssignedTicketsByStatusDocument = gql`
    query FindAssignedTicketsByStatus($options: FindAssignedTicketsByStatusInput!) {
  findAssignedTicketsByStatus(options: $options) {
    id
    title
    text
    priority
    status
    type
    assignedDeveloperId
  }
}
    `;

export function useFindAssignedTicketsByStatusQuery(options: Omit<Urql.UseQueryArgs<FindAssignedTicketsByStatusQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindAssignedTicketsByStatusQuery>({ query: FindAssignedTicketsByStatusDocument, ...options });
};
export const FindAssignedTicketsByTypeDocument = gql`
    query FindAssignedTicketsByType($options: FindAssignedTicketsByTypeInput!) {
  findAssignedTicketsByType(options: $options) {
    id
    title
    text
    priority
    status
    type
    assignedDeveloperId
  }
}
    `;

export function useFindAssignedTicketsByTypeQuery(options: Omit<Urql.UseQueryArgs<FindAssignedTicketsByTypeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindAssignedTicketsByTypeQuery>({ query: FindAssignedTicketsByTypeDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
    lastName
    email
    role
    organization {
      id
      name
    }
    assignedProjects {
      id
      name
    }
    managedProjects {
      id
      name
    }
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};