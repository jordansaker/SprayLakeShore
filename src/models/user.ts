
type UserRole = 'admin' | 'manager' | 'supervisor' | 'spray'

interface User {
  username: string,
  email: string,
  user_role: UserRole,
  password: string
}

export {
  User,
  UserRole
}