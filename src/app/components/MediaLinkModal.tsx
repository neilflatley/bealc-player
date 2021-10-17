import React, { useState } from 'react';
import Modal from 'styled-react-modal';

const StyledModal = Modal.styled`
  align-items: center;
  border-radius: 15px;
  background-color: ${props => props.theme.colors.white};
  justify-content: center;
  padding: 20px;

  .close {
    float: right;
  }

  .link {
    float: left;
    padding: 10px;
  }
`;

const MediaLinkModal = ({
  uri,
  buttonText,
  copiedText,
}: {
  uri: string;
  buttonText?: string;
  copiedText?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copyText, setCopyText] = useState(buttonText || 'Copy VLC link');

  const mediaUri = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${uri}`;

  const copyUri = () => {
    navigator.clipboard.writeText(mediaUri);
  };

  const toggleModal = () => {
    setCopyText(copiedText || 'Link copied');
    setIsOpen(!isOpen);
    copyUri();
  };

  return (
    <span>
      <button className="link-button" onClick={toggleModal}>
        {copyText}
      </button>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <div className="close">
          <button className="link-button" onClick={toggleModal}>
            Close
          </button>
        </div>
        <h3>Stream URL for VLC Media Player</h3>
        <p>
          Copy and paste this link into a streaming media player such as VLC to
          play media that is not streamable in the browser's HTML5 player, such
          as .avi or .wma file types
        </p>
        <div className="link">
          <a href={uri} target="_blank" rel="noreferrer">
            {mediaUri}
          </a>
        </div>
      </StyledModal>
    </span>
  );
};

export default MediaLinkModal;
