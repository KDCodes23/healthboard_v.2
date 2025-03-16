export function createClient() {
  // Return a mock client for development
  return {
    auth: {
      getSession: async () => ({
        data: {
          session: {
            user: {
              id: "mock-user-id",
              email: "user@example.com",
              user_metadata: {
                role: "patient",
                first_name: "John",
                last_name: "Smith",
              },
            },
          },
        },
      }),
      signInWithPassword: async () => ({
        data: {
          user: {
            id: "mock-user-id",
            email: "user@example.com",
            user_metadata: {
              role: "patient",
              first_name: "John",
              last_name: "Smith",
            },
          },
          session: {},
        },
        error: null,
      }),
      signUp: async () => ({
        data: {
          user: {
            id: "mock-user-id",
          },
        },
        error: null,
      }),
      signOut: async () => ({ error: null }),
    },
    from: (table: string) => ({
      insert: async () => ({ error: null }),
      select: async () => ({ data: [], error: null }),
    }),
  }
}

