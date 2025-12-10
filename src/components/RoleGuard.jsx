export default function RoleGuard({ allowed = [], user, children }) {
  if (!allowed.includes(user?.role)) {
    return <div className="p-5 text-red-600 text-xl">Not Authorized</div>;
  }
  return children;
}
