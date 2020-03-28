import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Date: any;
};

export type Aggregate = {
   __typename?: 'Aggregate';
  id?: Maybe<Scalars['ID']>;
  count?: Maybe<Scalars['Int']>;
};

export type AuthPayload = {
   __typename?: 'AuthPayload';
  access_token?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
  expires_in?: Maybe<Scalars['Int']>;
  token_type?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CreateUserInput = {
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
};



export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type ForgotPasswordResponse = {
   __typename?: 'ForgotPasswordResponse';
  status: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type ListMetadata = {
   __typename?: 'ListMetadata';
  count?: Maybe<Scalars['Int']>;
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LogoutResponse = {
   __typename?: 'LogoutResponse';
  status: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  register: RegisterResponse;
  login: AuthPayload;
  logout: LogoutResponse;
  forgotPassword: ForgotPasswordResponse;
  updateForgottenPassword: ForgotPasswordResponse;
  updatePassword: UpdatePasswordResponse;
  refreshToken: RefreshTokenPayload;
  socialLogin: AuthPayload;
  verifyEmail: AuthPayload;
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
};


export type MutationRegisterArgs = {
  input?: Maybe<RegisterInput>;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginInput>;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationUpdateForgottenPasswordArgs = {
  input?: Maybe<NewPasswordWithCodeInput>;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePassword;
};


export type MutationRefreshTokenArgs = {
  input?: Maybe<RefreshTokenInput>;
};


export type MutationSocialLoginArgs = {
  input: SocialLoginInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type NewPasswordWithCodeInput = {
  email: Scalars['String'];
  token: Scalars['String'];
  password: Scalars['String'];
  password_confirmation: Scalars['String'];
};

export type OrderByClause = {
  field: Scalars['String'];
  order: SortOrder;
};

export type PageInfo = {
   __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
  lastPage?: Maybe<Scalars['Int']>;
};

export type PaginatorInfo = {
   __typename?: 'PaginatorInfo';
  count: Scalars['Int'];
  currentPage: Scalars['Int'];
  firstItem?: Maybe<Scalars['Int']>;
  hasMorePages: Scalars['Boolean'];
  lastItem?: Maybe<Scalars['Int']>;
  lastPage: Scalars['Int'];
  perPage: Scalars['Int'];
  total: Scalars['Int'];
};

export type Query = {
   __typename?: 'Query';
  users?: Maybe<UserPaginator>;
  user?: Maybe<User>;
  opencrud_users: Array<User>;
  usersConnection: Array<User>;
  opencrud_user?: Maybe<User>;
  User?: Maybe<User>;
  allUsers: Array<User>;
  _allUsersMeta?: Maybe<ListMetadata>;
  apollo_users: Array<User>;
  apollo_paginated_users?: Maybe<UserPaginator>;
  apolloSingleUser?: Maybe<User>;
};


export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryOpencrud_UserArgs = {
  id?: Maybe<UserEdit>;
};


// export type QueryUserArgs = {
//   id?: Maybe<Scalars['Int']>;
// };


export type QueryApollo_Paginated_UsersArgs = {
  first: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
};


export type QueryApolloSingleUserArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type RefreshTokenInput = {
  refresh_token?: Maybe<Scalars['String']>;
};

export type RefreshTokenPayload = {
   __typename?: 'RefreshTokenPayload';
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
  expires_in: Scalars['Int'];
  token_type: Scalars['String'];
};

export type RegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  password_confirmation: Scalars['String'];
};

export type RegisterResponse = {
   __typename?: 'RegisterResponse';
  tokens?: Maybe<AuthPayload>;
  status: RegisterStatuses;
};

export enum RegisterStatuses {
  MustVerifyEmail = 'MUST_VERIFY_EMAIL',
  Success = 'SUCCESS'
}

export type SocialLoginInput = {
  provider: Scalars['String'];
  token: Scalars['String'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum Trashed {
  Only = 'ONLY',
  With = 'WITH',
  Without = 'WITHOUT'
}

export type UpdatePassword = {
  password: Scalars['String'];
  password_confirmation: Scalars['String'];
};

export type UpdatePasswordResponse = {
   __typename?: 'UpdatePasswordResponse';
  status: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type UserEdit = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type UserInput = {
  id: Scalars['ID'];
};

export type UserPaginator = {
   __typename?: 'UserPaginator';
  paginatorInfo: PaginatorInfo;
  data: Array<User>;
};

export type VerifyEmailInput = {
  token: Scalars['String'];
};

export type UserQueryFieldsFragment = (
  { __typename: 'User' }
  & Pick<User, 'id' | 'name' | 'email'>
);

export type GetUsersQueryVariables = {
  first: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
};


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { apollo_paginated_users?: Maybe<(
    { __typename?: 'UserPaginator' }
    & { data: Array<(
      { __typename?: 'User' }
      & UserQueryFieldsFragment
    )>, paginatorInfo: (
      { __typename?: 'PaginatorInfo' }
      & Pick<PaginatorInfo, 'perPage' | 'total'>
    ) }
  )> }
);

export type GetUserQueryVariables = {
  id: Scalars['ID'];
};


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { apolloSingleUser?: Maybe<(
    { __typename?: 'User' }
    & UserQueryFieldsFragment
  )> }
);

export type CreateUserMutationVariables = {
  name: Scalars['String'];
  email: Scalars['String'];
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type UpdateUserMutationVariables = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type DeleteUserMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export const UserQueryFieldsFragmentDoc = gql`
    fragment userQueryFields on User {
  id
  name
  email
  __typename
}
    `;
export const GetUsersDocument = gql`
    query GetUsers($first: Int!, $page: Int) {
  apollo_paginated_users(first: $first, page: $page) {
    data {
      ...userQueryFields
    }
    paginatorInfo {
      perPage
      total
    }
  }
}
    ${UserQueryFieldsFragmentDoc}`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
      }
export function useGetUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = ApolloReactCommon.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  apolloSingleUser(id: $id) {
    ...userQueryFields
  }
}
    ${UserQueryFieldsFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!) {
  createUser(input: {name: $name, email: $email}) {
    id
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $name: String, $email: String) {
  updateUser(input: {id: $id, name: $name, email: $email}) {
    id
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
  }
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;