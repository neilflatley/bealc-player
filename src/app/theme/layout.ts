export const sizes = {
  mobile: '400px',
  tablet: '650px',
  desktop: '1250px',
  largeDesktop: '1250px',
};

export const mq = {
  mobile: `only screen and (min-width: 0px) and (max-width: ${sizes.tablet})`,
  tablet: `only screen and (min-width: ${sizes.tablet}) and (max-width: ${sizes.desktop})`,
  desktop: `only screen and (min-width: ${sizes.desktop})`,
  largeDesktop: `only screen and (min-width: ${sizes.largeDesktop})`,
  landscapeNarrow: `only screen and (max-height: ${sizes.tablet})`,
};

// To use media queries follow this pattern
// @media ${({ theme }) => theme.mq.mobile} {
//   Styles here
// }

export const grid = {
  gap: '1.2rem',
  padding: {
    default: '1.6rem',
    large: '5.2rem',
  },
  margin: {
    default: '1.6rem',
    large: '5.2rem',
  },
  width: {
    default: '170rem',
    fullWidth: '100%',
    article: '80rem',
    small: '58.8rem',
  },
};

export const spacing = {
  small: '4rem',
  medium: '8rem',
  large: '12rem',
};
