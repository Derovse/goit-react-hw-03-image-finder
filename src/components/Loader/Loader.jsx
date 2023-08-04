import React from 'react';
import PropTypes from 'prop-types';
import { Dna } from 'react-loader-spinner';

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="custom-loader">
          <Dna
            visible={true}
            height="500"
            width="500"
            ariaLabel="dna-loading"
            wrapperStyle={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
            }}
            wrapperClass="dna-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      )}
    </>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
