import { ResizableBox } from 'react-resizable';

import { ResizableHandle } from '@components/ui/handles';

import styles from './call-resizer-wrapper.module.scss';

type CallResizerWrapperProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function CallResizerWrapper({
  children,
  className,
  style,
}: CallResizerWrapperProps) {
  return (
    <ResizableBox
      height={200}
      axis="y"
      resizeHandles={['s']}
      handleSize={[2000, 5]}
      minConstraints={[Infinity, 200]}
      maxConstraints={[Infinity, 453]}
      handle={(handleAxis, ref) => <ResizableHandle
        innerRef={ref}
        handleAxis={handleAxis}
        className={`${styles.handle} ${className || ''}`}
      />}
      style={style}
    >
      {children}
    </ResizableBox>
  )
}