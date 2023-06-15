import { ThreeDots } from 'react-loader-spinner';
import { LoaderContainer } from './LoaderStyled';

const Loader = () => {
  return (
    <LoaderContainer>
      <ThreeDots color="#3f51b5" height={200} width={200} />
    </LoaderContainer>
  );
};

export default Loader;
