import ResetPassword from '@/components/auth/resetPassword';

const ResetPasswordPage = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  return (
    <div>
      <ResetPassword token={searchParams.token} />
    </div>
  );
};

export default ResetPasswordPage;
