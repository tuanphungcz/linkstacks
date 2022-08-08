import classNames from 'classnames';

const commonButtonProps =
  'inline-flex items-center px-4 py-2 text-sm space-x-2 font-medium transition rounded-xl cursor-pointer font-medium relative';

export const PrimaryButton = ({ children, ...other }) => {
  return (
    <button
      {...other}
      className={classNames(
        'text-white  bg-gray-900 border border-gray-300  hover:opacity-90',
        commonButtonProps
      )}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, ...other }) => {
  return (
    <button
      {...other}
      className={classNames(
        ' text-gray-700  bg-white border border-gray-200 hover:bg-gray-50 hover:opacity-90',
        commonButtonProps
      )}
    >
      {children}
    </button>
  );
};
