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

  @media (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: ${p =>
      p.columns === 3 ? 'repeat(2, 1fr) auto' : '1fr auto'};

    .selected-node {
      ${p =>
        p.nowPlaying ? 'border-radius: 15px 15px 0 0;' : 'border-radius: 15px'}
    }

    .playlist {
      border-radius: 0;
    }

    .selected-item {
      grid-column: span 1;
      border-radius: 0 0 15px 15px;
    }
  }

  @media (min-width: 650px) {
    grid-template-columns: ${p => (p.columns === 3 ? 'repeat(2, 1fr)' : '1fr')};

    .selected-node {
      ${p =>
        p.columns === 3 && p.nowPlaying
          ? 'border-radius: 15px 0 0 0;'
          : p.columns === 3
          ? 'border-radius: 15px 0 0 15px;'
          : p.columns === 2 && p.nowPlaying
          ? 'border-radius: 15px 15px 0 0;'
          : p.columns === 2
          ? 'border-radius: 15px;'
          : ''}
    }

    .playlist {
      ${p =>
        p.nowPlaying
          ? 'border-radius: 0 15px 0 0;'
          : 'border-radius: 0 15px 15px 0;'}
    }

    .selected-item {
      grid-column: span 2;
      border-radius: 0 0 15px 15px;
    }
  }
  @media (min-width: 1250px) {
    grid-template-columns: ${p =>
      p.columns === 3 ? '1fr 1fr 8fr' : '1fr 9fr'};

    .selected-node {
      border-radius: 15px 0 0 15px;
    }

    .playlist {
      border-radius: 0;
    }

    .selected-item {
      grid-column: span 1;
      border-radius: 0 15px 15px 0;
    }
  }
`;

export default StyledBrowser;
