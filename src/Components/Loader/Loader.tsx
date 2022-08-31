import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { LoaderHeightWidthRadiusProps } from 'react-spinners/helpers/props';
import ScaleLoader from 'react-spinners/ScaleLoader';

export interface LoaderProps extends Omit<LoaderHeightWidthRadiusProps, 'ref'> {
  hasFillWholeBlock?: boolean;
}

function Loader({ className, hasFillWholeBlock, ...props }: LoaderProps) {
  const [isReadyToRender, setIsReadyToRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReadyToRender(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isReadyToRender) {
    return null;
  }

  return (
    <Root className={className} $hasFillWholeBlock={hasFillWholeBlock}>
      <ScaleLoaderStylized color="var(--red2)" {...props} />
    </Root>
  );
}

const Root = styled.div<{
  $hasFillWholeBlock: LoaderProps['hasFillWholeBlock'];
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $hasFillWholeBlock }) =>
    $hasFillWholeBlock &&
    `
    width: 100%;
    height: 100%;
  `}
`;

const ScaleLoaderStylized = styled(ScaleLoader)``;

export default Loader;
