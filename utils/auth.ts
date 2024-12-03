export function isAdmin(user: { role: string }) {
    return user.role === 'admin';
  }
  
  export function isTeacher(user: { role: string }) {
    return user.role === 'teacher';
  }
  
  export function isStudent(user: { role: string }) {
    return user.role === 'student';
  }
  