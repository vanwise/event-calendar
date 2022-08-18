import styled from 'styled-components/macro';

interface WithTextLineClampProps extends SpanPropsWithoutRef {
  lineCount?: number;
}

function TextWithLineClamp({
  lineCount = 1,
  ...props
}: WithTextLineClampProps) {
  return <Root $lineCount={lineCount} {...props} />;
}

const Root = styled.span<{ $lineCount: number }>`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $lineCount }) => $lineCount};
`;

export default TextWithLineClamp;
