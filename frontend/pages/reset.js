import PropTypes from 'prop-types';
import ResetPassword from '../components/ResetPassword';

const ResetPasswordPage = props => (
  <div>
    <ResetPassword resetToken={props.query.resetToken} />
  </div>
);

ResetPasswordPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default ResetPasswordPage;
