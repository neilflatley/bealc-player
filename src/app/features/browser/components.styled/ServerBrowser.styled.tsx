import styled from 'styled-components';

const StyledBrowser = styled.div`
  /* fill remaining height */
  position: absolute;
  top: 0;
  bottom: 0;

  border-radius: 5px;
  display: grid;
  grid-gap: 0.5rem;

  min-width: 100%;
  padding: 10px 10px ${p => (p.nowPlaying ? '70px' : '10px')} 10px;

  @media ${({ theme }) => theme.mq.mobile} {
    grid-template-columns: 1fr;
    grid-template-rows: ${p =>
      p.columns === 3 ? 'repeat(2, 1fr) auto' : '1fr auto'};

    .selected-node {
      ${p =>
        p.nowPlaying ? 'border-radius: 15px 15px 0 0;' : 'border-radius: 15px'}
    }

    .playlist {
      border-radius: ${p =>
        p.columns === 3 ? '0' : p.columns === 2 ? '15px 15px 0 0' : '15px'};
    }

    .selected-item {
      grid-column: span 1;
      border-radius: 0 0 15px 15px;
    }
  }

  @media ${({ theme }) => theme.mq.tablet} {
    grid-template-columns: ${p => (p.columns === 3 ? '1fr 1fr' : '1fr')};
    grid-template-rows: ${p =>
      p.columns === 3 ? 'auto' : p.columns === 2 ? '1fr auto' : '1fr'};

    .selected-node {
      ${p =>
        p.columns === 3 && p.nowPlaying
          ? 'border-radius: 15px 0 0 0;'
          : p.columns === 3
          ? 'border-radius: 15px 0 0 15px;'
          : p.fullWidth
          ? 'border-radius: 15px 15px 0 0;'
          : p.columns === 2
          ? 'border-radius: 15px;'
          : ''}
    }

    .playlist {
      ${p =>
        p.nowPlaying && p.columns === 2
          ? 'border-radius: 15px 15px 0 0;'
          : p.nowPlaying
          ? 'border-radius: 0 15px 0 0;'
          : 'border-radius: 0 15px 15px 0;'}
    }

    .selected-item {
      grid-column: span 2;
      border-radius: 0 0 15px 15px;
    }
  }
  @media ${({ theme }) => theme.mq.desktop} {
    grid-template-columns: ${p =>
      p.columns === 3 ? '1fr 1fr 50fr' : p.columns === 2 ? '1fr 50fr' : '50fr'};

    .selected-node {
      border-radius: ${p =>
        p.fullWidth ? '15px 15px 0 15px' : '15px 0 0 15px'};
    }

    .playlist {
      border-radius: ${p =>
        p.columns === 3 ? '0' : p.columns === 2 ? '15px 0 0 15px' : '15px'};
    }

    .selected-item {
      grid-column: span 1;
      border-radius: 0 15px 15px 0;
    }
  }
`;

export default StyledBrowser;
