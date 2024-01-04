
type UserRole = 'admin' | 'manager' | 'supervisor' | 'spray'

interface User {
  username: string,
  email: string,
  userRole: UserRole,
  password: string
}

export {
  User,
  UserRole
}