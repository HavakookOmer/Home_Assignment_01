import PropTypes from 'prop-types';


const Button = (props) => {
  let className = '';
  
  if (props.variant === 'primary') {
    className = 'btn-primary';
  } else if (props.variant === 'ghost') {
    className = 'btn-ghost';
  } else if (props.variant === 'white') {
    className = 'btn-white';
  }

  return (
    <button className={className} onClick={props.onClick}>
      {props.label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
